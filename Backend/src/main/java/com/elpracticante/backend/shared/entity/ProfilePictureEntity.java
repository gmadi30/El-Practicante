package com.elpracticante.backend.shared.entity;

import com.elpracticante.backend.student.entity.StudentEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "PROFILE_PICTURE")
public class ProfilePictureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "PROFILE_PICTURE_ID")
    private Integer id;

    @Column(name = "PICTURE_NAME")
    private String name;

    @Column(name = "PICTURE_TYPE")
    private String type;

    @Column(name = "PICTURE_PATH")
    private String path;


    @OneToOne(mappedBy = "profilePicture")
    private StudentEntity student;
}
