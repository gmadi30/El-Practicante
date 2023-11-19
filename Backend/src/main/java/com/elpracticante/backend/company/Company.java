package com.elpracticante.backend.company;


public record Company(

        Integer companyId,
        String companyName,
        Double rating,
        String city,
        String autonomousCommunity,
        Integer intershipsAmount
) {

    public Company(String companyName, Double rating) {
        this(null, companyName, rating, null, null, null);
    }
}
