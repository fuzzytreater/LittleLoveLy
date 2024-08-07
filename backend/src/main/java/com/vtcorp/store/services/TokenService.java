package com.vtcorp.store.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TokenService {

    private final JwtEncoder encoder;
    private final JwtDecoder decoder;

    public TokenService(JwtEncoder encoder, JwtDecoder decoder) {
        this.encoder = encoder;
        this.decoder = decoder;
    }

    public String generateLoginToken(Authentication authentication) {
        Instant now = Instant.now();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String name = Optional.ofNullable(userDetails.getUser().getName()).orElse("");
        Integer point = Optional.ofNullable(userDetails.getUser().getPoint()).orElse(0);
        // Collect the authorities of the authenticated user into a single string
        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        // Create the payload of the JWT
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(2, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("roles", role)
                .claim("name", name)
                .claim("point", point)
                .build();
        // Encode the payload into a JWT string and return it
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

//    public String generateAccessToken(User user) {
//        Instant now = Instant.now();
//        String name = Optional.ofNullable(user.getName()).orElse("");
//        Integer point = Optional.ofNullable(user.getPoint()).orElse(0);
//        JwtClaimsSet claims = JwtClaimsSet.builder()
//                .issuer("self")
//                .issuedAt(now)
//                .expiresAt(now.plus(1, ChronoUnit.HOURS))
//                .subject(user.getUsername())
//                .claim("roles", user.getRole())
//                .claim("name", name)
//                .claim("point", point)
//                .build();
//        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
//    }

    public String generatePasswordResetToken(String userEmail) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .subject(userEmail)
                .issuedAt(now)
                .expiresAt(now.plus(30, ChronoUnit.MINUTES))
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public Jwt decodeToken(String token) {
        return this.decoder.decode(token);
    }

    public Jwt validateToken(String token) {
        try {
            Jwt jwt = decoder.decode(token);
            if (jwt.getExpiresAt().isBefore(Instant.now())) {
                throw new JwtException("Token is expired");
            }
            return jwt;
        } catch (JwtException e) {
            throw new JwtException("Token is expired");
        } catch (Exception e) {
            throw new IllegalArgumentException("Token is not valid", e);
        }
    }

    public String generateMailChangeToken(String username, String newEmail) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .subject(username)
                .claim("newEmail", newEmail)
                .issuedAt(now)
                .expiresAt(now.plus(30, ChronoUnit.MINUTES))
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}