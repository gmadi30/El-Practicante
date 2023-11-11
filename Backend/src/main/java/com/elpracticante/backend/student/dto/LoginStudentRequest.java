package com.elpracticante.backend.student.dto;

public record LoginStudentRequest(
        String studentEmail,

        String password
) {
}
