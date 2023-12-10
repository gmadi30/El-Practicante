package com.elpracticante.backend.company.repository;

import com.elpracticante.backend.company.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyEntity, Integer> {

    Optional<CompanyEntity> findByNif(String nif);

    @Query("SELECT c FROM CompanyEntity c LEFT JOIN c.internships i GROUP BY c ORDER BY COUNT(i) DESC")
    List<CompanyEntity> findAllByOrderByInternshipsDesc();

    @Query("SELECT c FROM CompanyEntity c LEFT JOIN c.internships i GROUP BY c ORDER BY COUNT(i)")
    List<CompanyEntity> findAllByOrderByInternshipsAsc();

}
