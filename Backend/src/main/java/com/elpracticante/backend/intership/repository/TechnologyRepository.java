package com.elpracticante.backend.intership.repository;

import com.elpracticante.backend.intership.entity.TechnologyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechnologyRepository extends JpaRepository<TechnologyEntity, Integer> {

    Optional<TechnologyEntity> findByName(String name);
}
