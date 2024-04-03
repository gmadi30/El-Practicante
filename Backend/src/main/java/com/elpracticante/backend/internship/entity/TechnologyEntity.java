package com.elpracticante.backend.internship.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "TECHNOLOGY")
public class TechnologyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "TECHNOLOGY_ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @ManyToMany(mappedBy = "technologies",  fetch = FetchType.LAZY)
    private List<InternshipEntity> internships;

}

