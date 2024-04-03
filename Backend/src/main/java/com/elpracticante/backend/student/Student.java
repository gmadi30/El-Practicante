package com.elpracticante.backend.student;

import com.elpracticante.backend.company.Company;

import java.time.LocalDate;

public record Student(
        Integer id,
        String name,
        String lastName,
        String email,
        String city,
        String autonomousCommunity,
        String mobile,
        Company company,
        String profilePictureName,
        LocalDate birthday


) {
}
