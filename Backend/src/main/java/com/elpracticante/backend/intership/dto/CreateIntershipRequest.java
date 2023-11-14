package com.elpracticante.backend.intership.dto;

import com.elpracticante.backend.company.dto.CompanyDTO;
import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.school.dto.SchoolDTO;

import java.util.List;

public record CreateIntershipRequest(

        SchoolDTO school,

        CompanyDTO company,

        DegreeDTO degree,

        String startDate,

        String endDate,

        String description,

        List<String> technologies,

        List<String> summaryBest,

        List<String> summaryWorst

) {
}
