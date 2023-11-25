package com.elpracticante.backend.student.dto;

import com.elpracticante.backend.intership.Intership;

import java.util.List;

public record GetStudentResponse (
        String name,

        String lastName,

        String companyName,

        List<Intership> interships

) {
}
