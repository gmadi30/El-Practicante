package com.elpracticante.backend.degree.repository;

import com.elpracticante.backend.degree.entity.DegreeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DegreeRepository extends JpaRepository<DegreeEntity, Integer> {
    Optional<DegreeEntity> findByName(String name);
}
