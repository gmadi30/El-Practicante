package com.elpracticante.backend.shared.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "FEEDBACK_ENTRIES")
public class FeedbackEntriesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "FEEDBACK_ENTRIES_ID")
    Integer id;

    @Column(name = "FEEDBACK")
    String feedback;
}
