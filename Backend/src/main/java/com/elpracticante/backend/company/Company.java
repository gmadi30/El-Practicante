package com.elpracticante.backend.company;


import com.elpracticante.backend.internship.Internship;

import java.util.List;

public record Company(

        Integer companyId,
        String companyName,
        Double rating,
        String city,
        String email,
        String autonomousCommunity,
        Integer intershipsAmount,
        String aboutUs,
        String whyUs,
        String website,
        List<Internship> internships
) {

    public Company(String companyName, Double rating) {
        this(null, companyName, rating, null, null, null, null, null, null, null, null);
    }

    public Company(Integer companyId, String companyName, Double rating, Integer intershipsAmount) {
        this(companyId, companyName, rating, null, null, null, intershipsAmount, null, null, null, null);
    }
}
