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

    @Column(name = "SUBMITTED_DATE")
    private LocalDate submittedDate;

    @Column(name = "RATING")
    private Integer rating;

    @Column(name = "IS_ANONYMOUS")
    private Boolean isAnonymous;

    @ManyToOne(optional = false,  fetch = FetchType.LAZY)
    @JoinColumn(name = "SCHOOL_ID")
    private SchoolEntity school;

    @ManyToOne(optional = false,  fetch = FetchType.LAZY)
    @JoinColumn(name = "DEGREE_ID")
    private DegreeEntity degree;

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name="STUDENT_ID")
    private StudentEntity student;

    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name="COMPANY_ID")
    private CompanyEntity company;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH})
    @JoinTable(name = "INTERNSHIP_TECHNOLOGY",
            joinColumns = @JoinColumn(name = "INTERNSHIP_ID"),
            inverseJoinColumns = @JoinColumn(name = "TECHNOLOGY_ID"))
    private List<TechnologyEntity> technologies;

    @ManyToMany(fetch = FetchType.LAZY , cascade = {CascadeType.ALL})
    @JoinTable(name = "INTERNSHIP_SUMMARIZE",
            joinColumns = @JoinColumn(name = "INTERNSHIP_ID"),
            inverseJoinColumns = @JoinColumn(name = "SUMMARIZE_ID"))
    private List<SummarizeEntity> summaries;

}
