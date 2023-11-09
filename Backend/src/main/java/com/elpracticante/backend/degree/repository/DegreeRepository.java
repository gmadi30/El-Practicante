package com.elpracticante.backend.degree.repository;

import com.elpracticante.backend.degree.entity.DegreeEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DegreeRepository extends JpaRepository<DegreeEntity, Integer> {
}
