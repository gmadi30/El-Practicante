package com.elpracticante.backend.degree.entity;


import com.elpracticante.backend.internship.entity.InternshipEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Data
@Table(name = "DEGREE")
public class DegreeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)    @Column(name = "DEGREE_ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @OneToMany(mappedBy = "degree", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<InternshipEntity> internships;
}
