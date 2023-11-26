package com.elpracticante.backend.internship.repository;

import com.elpracticante.backend.internship.entity.TechnologyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechnologyRepository extends JpaRepository<TechnologyEntity, Integer> {

    Optional<TechnologyEntity> findByName(String name);
}
