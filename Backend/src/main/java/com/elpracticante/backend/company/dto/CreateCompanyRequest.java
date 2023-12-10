package com.elpracticante.backend.company.dto;

public record CreateCompanyRequest(

        String name,
        String email,
        Integer empoyeesAmount,
        String autonomousCommunity,
        String zipcode,
        String city,
        String aboutUs,
        String whyUs,
        Double rating,
        String nif,
        String website


) {
}
