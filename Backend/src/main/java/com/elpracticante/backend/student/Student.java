package com.elpracticante.backend.student;

import com.elpracticante.backend.company.dto.CompanyDTO;
import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.school.dto.SchoolDTO;

public record Student(
        Integer id,
        String name,
        String lastName,
        String email,
        String city,
        String autonomousCommunity,
        String mobile,
        String companyName,
        SchoolDTO schoolDTO,
        DegreeDTO degreeDTO




) {
}
