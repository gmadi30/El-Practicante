package com.elpracticante.backend.company.repository;

import com.elpracticante.backend.company.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Integer> {
    
}
