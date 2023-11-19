package com.elpracticante.backend.intership.entity;


import com.elpracticante.backend.intership.dto.SummarizeType;
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
    private SummarizeType type;

    @ManyToMany(mappedBy = "summaries", fetch = FetchType.LAZY)
    private List<IntershipEntity> interships;
}
