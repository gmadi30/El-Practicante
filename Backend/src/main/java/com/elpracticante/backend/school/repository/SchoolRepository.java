package com.elpracticante.backend.school.repository;

import com.elpracticante.backend.school.entity.SchoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SchoolRepository extends JpaRepository<SchoolEntity, Integer> {
}
