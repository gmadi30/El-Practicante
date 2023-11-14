package com.elpracticante.backend.intership.entity;

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

    private String name;

    private String category;

    @ManyToMany(mappedBy = "technologies")
    private List<IntershipEntity> interships;

}
