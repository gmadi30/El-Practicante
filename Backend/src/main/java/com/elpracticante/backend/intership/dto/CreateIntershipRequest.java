package com.elpracticante.backend.intership.dto;

import com.elpracticante.backend.company.dto.CompanyDTO;
import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.school.dto.SchoolDTO;

import java.util.List;

public record CreateIntershipRequest(

        String schoolName,

        Integer companyId,

        Integer studentId,

        String degreeName,

        String startDate,

        String endDate,

        String description,

        Integer rating,

        List<String> technologies,

        List<String> summaryBest,

        List<String> summaryWorst

) {
}
