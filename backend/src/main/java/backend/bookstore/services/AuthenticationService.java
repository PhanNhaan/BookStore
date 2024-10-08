package backend.bookstore.services;

import backend.bookstore.model.User;
import backend.bookstore.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Slf4j
@Service
public class AuthenticationService {
    private UserRepository userRepository;

    @Value("${jwt.signerKey}")
    private String SECRET_KEY;
    private final long JWT_EXPIRATION = 1000 * 60 * 60 * 24 ;

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
                .claim("scope", userDetails.getRole())//add claim
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())//sign secret key
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
}
