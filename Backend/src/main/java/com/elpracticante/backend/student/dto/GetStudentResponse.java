package com.elpracticante.backend.student.dto;

import com.elpracticante.backend.company.dto.CompanyDTO;
import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.school.dto.SchoolDTO;

public record GetStudentResponse (
        String name,

        String lastName,

        CompanyDTO companyDTO,

        SchoolDTO schoolDTO,

        DegreeDTO degreeDTO

) {
}
