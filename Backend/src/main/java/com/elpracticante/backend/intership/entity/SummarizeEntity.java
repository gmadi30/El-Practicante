package com.elpracticante.backend.intership.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "SUMMARIZE")
public class SummarizeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "SUMMARIZE_ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TYPE")
    private String type;

    @ManyToMany(mappedBy = "summaries")
    private List<IntershipEntity> interships;
}
