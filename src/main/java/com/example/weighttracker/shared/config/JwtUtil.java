package com.example.weighttracker.shared.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;

    private final long expirationTime = 3600000; // 1 hour

    // helper method to get the signing key from the secret key
    private SecretKey getSigningKey() {
        return io.jsonwebtoken.security.Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(String mail) {
        return Jwts.builder()
                .subject(mail) // who the token is for
                .issuedAt(new Date()) // when the token was issued
                .expiration(new Date(System.currentTimeMillis() + expirationTime)) // when the token expires
                .signWith(getSigningKey()) // sign the token with the secret key
                .compact(); // build the token
    }

    // extract the mail (subject) from the token
    public String extractMail(String token) {
        return getClaims(token).getSubject();
    }

    // check if the token is valid (not expired and correctly signed)
    public boolean isTokenValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    // helper method to get the claims from the token
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
