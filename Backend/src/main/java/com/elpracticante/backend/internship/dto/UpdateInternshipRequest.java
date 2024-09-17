package com.elpracticante.backend.internship.dto;

import java.util.List;

public record UpdateInternshipRequest(

        Integer schoolId,

        Integer companyId,

        Integer studentId,

        Integer degreeId,

        String startDate,

        String endDate,

        String title,

        String description,

        Integer rating,

        List<Technology> selectedTechnologies,

        List<String> summaryBest,

        List<String> summaryWorst,

        Boolean isAnonymous

) {
}
