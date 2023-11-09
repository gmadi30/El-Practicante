package com.elpracticante.backend.student.dto;

public record CreateStudentRequest(

        String name,

        String lastName,

        String DNI,

        String email,

        String password,

        String birthDay,

        String city,

        String autonomousCommunity,

        String zipCode,

        String mobile,

        String company,

        String school,

        String degree
) {}
