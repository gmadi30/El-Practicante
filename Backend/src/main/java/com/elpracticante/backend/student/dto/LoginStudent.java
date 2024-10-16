package com.elpracticante.backend.student.dto;

import com.elpracticante.backend.auth.AuthenticationResponse;

public record LoginStudent(
        Integer studentId,
        AuthenticationResponse authenticationResponse
) {
}
