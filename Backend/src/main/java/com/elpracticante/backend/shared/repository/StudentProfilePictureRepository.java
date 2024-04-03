package com.elpracticante.backend.shared.repository;

import com.elpracticante.backend.shared.entity.StudentProfilePictureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentProfilePictureRepository extends JpaRepository<StudentProfilePictureEntity, Integer> {

    Optional<StudentProfilePictureEntity> findByName(String name);
}
