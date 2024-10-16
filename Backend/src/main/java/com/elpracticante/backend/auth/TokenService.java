package com.elpracticante.backend.auth;

import com.elpracticante.backend.student.entity.StudentEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class TokenService {

    private final JwtEncoder encoder;
    private final JwtDecoder jwtDecoder;



    public TokenService(JwtEncoder encoder, JwtDecoder jwtDecoder) {
        this.encoder = encoder;
        this.jwtDecoder = jwtDecoder;
    }

    public String generateAccessToken(Authentication authentication) {
        return generateToken(authentication, 30);
    }

    public String generateRefreshToken(Authentication authentication) {
        return generateToken(authentication, 10080);
    }

    private String generateToken(Authentication authentication, Integer amountToAdd) {
        //
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(amountToAdd, ChronoUnit.MINUTES))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public void tokenDecoder(String token) {
        Jwt decodedToken = jwtDecoder.decode(token);
        System.out.println("Decoded token: " + decodedToken.getExpiresAt());
        Boolean expired = decodedToken.getExpiresAt().isBefore(Instant.now());
        System.out.println("Decoded token is expired: " + expired);
    }

    public String extractUsername(String token) {
        return jwtDecoder.decode(token).getSubject();
    }

    private Instant extractExpiration(String token) {
        return jwtDecoder.decode(token).getExpiresAt();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).isBefore(Instant.now());
    }

    public boolean isValid(String token, UserDetails user) {
        return (extractUsername(token).equals(user.getUsername())) && !isTokenExpired(token);
    }

    public boolean isValidRefreshToken(String token, StudentEntity student) {
        return (extractUsername(token).equals(student.getEmail())) && !isTokenExpired(token);
    }





}