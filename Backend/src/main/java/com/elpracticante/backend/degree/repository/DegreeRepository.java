package com.elpracticante.backend.degree.repository;

import com.elpracticante.backend.degree.entity.DegreeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DegreeRepository extends JpaRepository<DegreeEntity, Integer> {
    Optional<DegreeEntity> findByName(String name);
}
