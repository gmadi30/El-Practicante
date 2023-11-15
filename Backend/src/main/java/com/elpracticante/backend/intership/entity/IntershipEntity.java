package com.elpracticante.backend.intership.entity;


import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.student.entity.StudentEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "INTERSHIP")
public class IntershipEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "INTERSHIP_ID")
    private Integer id;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "RATING")
    private Integer rating;

    @Column(name = "DEGREE_NAME")
    private String degreeName;

    @Column(name = "SCHOOL_NAME")
    private String schoolName;

    @ManyToOne(optional = false)
    @JoinColumn(name="STUDENT_ID")
    private StudentEntity student;

    @ManyToOne(optional = false)
    @JoinColumn(name="COMPANY_ID")
    private CompanyEntity company;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "INTERSHIP_TECHNOLOGY",
            joinColumns = @JoinColumn(name = "INTERSHIP_ID"),
            inverseJoinColumns = @JoinColumn(name = "TECHNOLOGY_ID"))
    private List<TechnologyEntity> technologies;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "INTERSHIP_SUMMARIZE",
            joinColumns = @JoinColumn(name = "INTERSHIP_ID"),
            inverseJoinColumns = @JoinColumn(name = "SUMMARIZE_ID"))
    private List<SummarizeEntity> summaries;

}
