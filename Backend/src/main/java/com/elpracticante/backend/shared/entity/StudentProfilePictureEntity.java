package com.elpracticante.backend.shared.entity;

import com.elpracticante.backend.student.entity.StudentEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "STUDENT_PROFILE_PICTURE")
public class StudentProfilePictureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "STUDENT_PROFILE_PICTURE_ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "PATH")
    private String path;


    @OneToOne(mappedBy = "studentProfilePicture")
    private StudentEntity student;
}
