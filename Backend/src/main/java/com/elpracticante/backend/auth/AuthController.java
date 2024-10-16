package com.elpracticante.backend.auth;

import com.elpracticante.backend.shared.exceptions.UserNotFoundException;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);

    private final TokenService tokenService;
    private final StudentRepository studentRepository;

    public AuthController(TokenService tokenService, StudentRepository studentRepository) {
        this.tokenService = tokenService;
        this.studentRepository = studentRepository;
    }

    @PostMapping("/token")
    public String generateAccessToken(Authentication authentication) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                "test", "test"
        );
        String token = tokenService.generateAccessToken(usernamePasswordAuthenticationToken);
        LOG.debug("Token granted: {}", token);
        return token;
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> generateRefreshToken(HttpServletRequest request, HttpServletResponse response) {
        // extract the token from authorization header
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);

        // extract username from token
        String username = tokenService.extractUsername(token);

        // check if the user exist in database
        StudentEntity studentEntity = studentRepository.findByEmail(username)
                .orElseThrow(()->new UserNotFoundException("No user found"));

        // check if the token is valid
        if(tokenService.isValidRefreshToken(token, studentEntity)) {
            // generate access token
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    studentEntity.getEmail(),
                    studentEntity.getPassword()
            );
            String accessToken = tokenService.generateAccessToken(usernamePasswordAuthenticationToken);
            String refreshToken = tokenService.generateRefreshToken(usernamePasswordAuthenticationToken);

            MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
            headers.add(HttpHeaders.AUTHORIZATION,accessToken);
            headers.add("Refresh-Token", refreshToken);

            return new ResponseEntity(headers, HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }



}