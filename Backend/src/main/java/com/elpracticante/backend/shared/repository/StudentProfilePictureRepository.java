package com.elpracticante.backend.shared.repository;

import com.elpracticante.backend.shared.entity.StudentProfilePictureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentProfilePictureRepository extends JpaRepository<StudentProfilePictureEntity, Integer> {

    Optional<StudentProfilePictureEntity> findByName(String name);
}
