package backend.bookstore.services;

import backend.bookstore.dto.response.LoginResponse;
import backend.bookstore.exception.AppException;
import backend.bookstore.exception.ErrorCode;
import backend.bookstore.model.InvalidatedToken;
import backend.bookstore.model.User;
import backend.bookstore.repository.InvalidatedTokenRepository;
import backend.bookstore.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;
import java.util.function.Function;

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
}
