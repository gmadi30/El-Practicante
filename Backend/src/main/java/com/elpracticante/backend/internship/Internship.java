package com.elpracticante.backend.internship;

import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.internship.dto.Summarize;
import com.elpracticante.backend.internship.dto.Technology;
import com.elpracticante.backend.student.Student;

import java.time.LocalDate;
import java.util.List;

public record Internship(
        Integer id,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Integer rating,
        String degreeName,
        String schoolName,
        Company company,
        Student student,
        List<Technology> technologyList,
        List<Summarize> summarizeList
) {

    public Internship(Integer id, String description, LocalDate startDate, LocalDate endDate, Integer rating, String degreeName, String schoolName, Company company, List<Technology> technologyList, List<Summarize> summarizeList) {
        this(id, description, startDate, endDate, rating, degreeName, schoolName, company, null, technologyList, summarizeList);
    }
}
