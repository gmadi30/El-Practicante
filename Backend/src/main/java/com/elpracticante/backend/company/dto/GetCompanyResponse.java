package com.elpracticante.backend.company.dto;

import com.elpracticante.backend.internship.Internship;

import java.util.List;

public record GetCompanyResponse(
       String name,
       String email,
       Integer employeesAmount,
       String autonomousCommunity,
       String city,
       String aboutUs,
       String whyUs,
       List<Internship> internships,
       Double rating

) {
}
