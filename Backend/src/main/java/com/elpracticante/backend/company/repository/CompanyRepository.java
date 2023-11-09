package com.elpracticante.backend.company.repository;

import com.elpracticante.backend.company.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Integer> {
}
