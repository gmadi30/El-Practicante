package com.elpracticante.backend.internship;

import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.internship.dto.Summarize;
import com.elpracticante.backend.internship.dto.Technology;
import com.elpracticante.backend.school.School;
import com.elpracticante.backend.student.Student;

import java.time.LocalDate;
import java.util.List;

public record Internship(
        Integer id,
        String title,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Integer rating,
        Degree degree,
        School school,
        Company company,
        Student student,
        List<Technology> technologyList,
        List<Summarize> summarizeList
) {

}
