package com.elpracticante.backend.school.dto;

import com.elpracticante.backend.school.School;

import java.util.List;

public record GetSchoolsResponse(
        List<School> schools
) {
}
