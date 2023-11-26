package com.elpracticante.backend.internship.dto;

import java.util.List;

public record CreateInternshipRequest(

        Integer schoolId,

        Integer companyId,

        Integer studentId,

        Integer degreeId,

        String startDate,

        String endDate,

        String description,

        Integer rating,

        List<String> technologies,

        List<String> summaryBest,

        List<String> summaryWorst

) {
}