package com.elpracticante.backend.internship.entity;


import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.student.entity.StudentEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "INTERNSHIP")
public class InternshipEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "INTERNSHIP_ID")
    private Integer id;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "RATING")
    private Integer rating;

    @ManyToOne(optional = false)
    @JoinColumn(name = "SCHOOL_ID")
    private SchoolEntity school;

    @ManyToOne(optional = false)
    @JoinColumn(name = "DEGREE_ID")
    private DegreeEntity degree;


    @ManyToOne(optional = false, cascade = CascadeType.ALL,  fetch = FetchType.LAZY)
    @JoinColumn(name="STUDENT_ID")
    private StudentEntity student;

    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="COMPANY_ID")
    private CompanyEntity company;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "INTERNSHIP_TECHNOLOGY",
            joinColumns = @JoinColumn(name = "INTERNSHIP_ID"),
            inverseJoinColumns = @JoinColumn(name = "TECHNOLOGY_ID"))
    private List<TechnologyEntity> technologies;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "INTERNSHIP_SUMMARIZE",
            joinColumns = @JoinColumn(name = "INTERNSHIP_ID"),
            inverseJoinColumns = @JoinColumn(name = "SUMMARIZE_ID"))
    private List<SummarizeEntity> summaries;

}
