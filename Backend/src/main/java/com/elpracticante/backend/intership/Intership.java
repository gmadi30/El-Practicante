package com.elpracticante.backend.intership;

import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.intership.dto.Summarize;
import com.elpracticante.backend.intership.dto.Technology;
import com.elpracticante.backend.intership.entity.TechnologyEntity;
import jakarta.persistence.Column;

import java.time.LocalDate;
import java.util.List;

public record Intership(
        Integer id,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Integer rating,
        String degreeName,
        String schoolName,
        Company company,
        List<Technology> technologyList,
        List<Summarize> summarizeList
) {
}
