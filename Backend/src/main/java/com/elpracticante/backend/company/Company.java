package com.elpracticante.backend.company;


public record Company(

        Integer companyId,
        String companyName,
        Double rating,
        String city,
        String autonomousCommunity,
        Integer intershipsAmount
) {


    public Company(String companyName, Double rating, Integer intershipsAmount) {
        this(null, companyName, rating, null, null, intershipsAmount);
    }

    public Company(String name, Double rating) {
        this(null, name, rating, null, null, null);
    }

    public Company(Integer id, String name, Double rating, int size) {
        this(id, name, rating, null, null, size);

    }
}
