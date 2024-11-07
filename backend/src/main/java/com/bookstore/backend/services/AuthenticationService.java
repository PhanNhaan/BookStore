package com.bookstore.backend.services;

import com.bookstore.backend.dto.response.LoginResponse;
import com.bookstore.backend.exception.AppException;
import com.bookstore.backend.exception.ErrorCode;
import com.bookstore.backend.model.InvalidatedToken;
import com.bookstore.backend.model.User;
import com.bookstore.backend.repository.InvalidatedTokenRepository;
import com.bookstore.backend.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;


import com.nimbusds.jose.JOSEException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;
import java.util.function.Function;

//import static org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames.REDIRECT_URI;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    public AuthenticationService(InvalidatedTokenRepository invalidatedTokenRepository) {
        this.invalidatedTokenRepository = invalidatedTokenRepository;
    }
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InvalidatedTokenRepository invalidatedTokenRepository;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    @Value("${spring.security.oauth2.client.registration.google.user-info-uri}")
    private String userInfoUri;

    @Value("${jwt.signerKey}")
    private String SECRET_KEY;
    private final long JWT_EXPIRATION = 1000 * 60 * 60 * 24 ;
    private final long REFRESHABLE_DURATION = 1000 * 60 * 60 * 24*3 ;

    //get data token
    public Claims extractAllClaim (String token){
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public Date extractExpiration(String token){
        return extractAllClaim(token).getExpiration();
    }

    public String generateToken(User userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

    public String generateToken(Map<String,Object> extraClaims, User userDetails){
        Date expirationDate = new Date(System.currentTimeMillis() + JWT_EXPIRATION);

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUserName()) //set subject: username
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expirationDate)
                .setId(UUID.randomUUID().toString())
                .claim("scope", userDetails.getRole())//add claim
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())//sign secret key
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String jwt){
        return extractClaim(jwt, Claims::getSubject);
    }
    //get claim
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaim(token);
        return claimsResolver.apply(claims);
    }

    public boolean isValidateToken(String token){
        String userName= extractUsername(token);
        Optional<User> userDetails = userRepository.findByUserName(userName);

        return userDetails.isPresent() && extractExpiration(token).after(new Date());
    }

    public boolean validateToken(String token) throws JOSEException, ParseException {
        boolean isValid = true;

        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }

        return isValid;
    }

    private Claims verifyToken(String token, boolean isRefresh)  throws JOSEException, ParseException {
        JwtParser jwtParser  =Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build();
        var verified = jwtParser.isSigned(token);
        Claims claims;
        try {
            claims = jwtParser.parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            claims = e.getClaims();
        }
//        Claims claims = jwtParser.parseClaimsJws(token).getBody();
        var expiryTime = (isRefresh)
                ? new Date(claims.getIssuedAt().getTime() + REFRESHABLE_DURATION)
                : claims.getExpiration();

        if (!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository.existsById(claims.getId()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return claims;
//        try {
//            Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(authToken);
//            return true;
//        } catch (MalformedJwtException ex) {
//            log.error("Invalid JWT token");
//        } catch (ExpiredJwtException ex) {
//            log.error("Expired JWT token");
//        } catch (UnsupportedJwtException ex) {
//            log.error("Unsupported JWT token");
//        } catch (IllegalArgumentException ex) {
//            log.error("JWT claims string is empty.");
//        }
//        return false;
    }

    public void logout(String token) throws ParseException, JOSEException {
        var signToken = verifyToken(token, false);

        String jit = signToken.getId();
        Date expiryTime = signToken.getExpiration();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();

        invalidatedTokenRepository.save(invalidatedToken);
    }

    public LoginResponse refreshToken(String token) throws ParseException, JOSEException {
        var signToken = verifyToken(token, true);

        String jit = signToken.getId();
        Date expiryTime = signToken.getExpiration();

        //invalid token
        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();

        invalidatedTokenRepository.save(invalidatedToken);

        //generateToken
        var username = signToken.getSubject();
        var user = userRepository.findByUserName(username).orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        String newToken = generateToken(user);

        return LoginResponse.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .role(user.getRole())
                .token(newToken)
                .token_type("Bearer")
                .expire_in(extractExpiration(newToken))
                .build();
    }

    public Map<String, Object> authenticateGoogle(String code) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        String accessToken = new GoogleAuthorizationCodeTokenRequest(
                new NetHttpTransport(),new GsonFactory(),
                clientId,
                clientSecret,
                code,
                redirectUri
        ).execute().getAccessToken();

        restTemplate.getInterceptors().add((req, body, executionContext) -> {
            req.getHeaders().add("Authorization", "Bearer " + accessToken);
            return executionContext.execute(req,body);
        });

        return new ObjectMapper().readValue(
                restTemplate.getForEntity(userInfoUri, String.class).getBody(),
                new TypeReference<>() {});
        }

    public User loginWithGoogle(Map<String, Object> userInfo) {
        String password = RandomStringUtils.randomAlphanumeric(8);

        log.info(password);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        var user = userRepository.findByUserEmail(userInfo.get("email").toString()).orElseGet(
                ()-> userRepository.save(User.builder()
                        .userName(userInfo.get("email").toString())
                        .fullName(userInfo.get("name").toString())
                        .googleId(userInfo.get("id").toString())
                        .userEmail(userInfo.get("email").toString())
                        .avatar(userInfo.get("picture").toString())
                        .password(passwordEncoder.encode(password))
                        .role("USER")
                        .build())
        );

        if (user.getGoogleId().isEmpty()) {
            user.setGoogleId(userInfo.get("id").toString());
            userRepository.save(user);
        }

        return user;
    }
}
