package com.elpracticante.backend.school.dto;

public record CreateSchoolRequest(

        String name,
        String email,
        String city,
        String autonomousCommunity,
        String zipCode,
        String fullAddress
) {
}
