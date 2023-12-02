package com.elpracticante.backend.school.repository;

import com.elpracticante.backend.school.entity.SchoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SchoolRepository extends JpaRepository<SchoolEntity, Integer> {
    Optional<SchoolEntity> findByName(String name);
}
