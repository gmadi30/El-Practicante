package com.elpracticante.backend.company.dto;

import com.elpracticante.backend.intership.Intership;

import java.util.List;

public record GetCompanyResponse(
       String name,
       String email,
       Integer employeesAmount,
       String autonomousCommunity,
       String city,
       String aboutUs,
       String whyUs,
       List<Intership> interships,
       Double rating

) {
}
