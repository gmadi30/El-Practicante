package com.elpracticante.backend.student.dto;

import org.springframework.web.multipart.MultipartFile;

public record UpdateStudentRequest(

        Integer studentId,
        String name,
        String lastName,
        // String dni,
        String email,
        String password,
        String birthday,
        String city,
        String autonomousCommunity,
        String zipcode,
        String mobile,
        Integer companyId,
        Integer schoolId,
        Integer degreeId,
        MultipartFile profilePicture
) {
}
