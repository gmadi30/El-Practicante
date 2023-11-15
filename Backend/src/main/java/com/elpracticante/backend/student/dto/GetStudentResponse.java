package com.elpracticante.backend.student.dto;

import com.elpracticante.backend.company.dto.CompanyDTO;
import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.intership.Intership;
import com.elpracticante.backend.school.dto.SchoolDTO;

import java.util.List;

public record GetStudentResponse (
        String name,

        String lastName,

        String companyName,

        SchoolDTO schoolDTO,

        DegreeDTO degreeDTO,

        List<Intership> interships

) {
}
