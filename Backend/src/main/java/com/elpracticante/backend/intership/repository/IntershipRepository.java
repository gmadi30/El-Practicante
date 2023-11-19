package com.elpracticante.backend.intership.repository;

import com.elpracticante.backend.intership.entity.IntershipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IntershipRepository extends JpaRepository<IntershipEntity, Integer> {

    List<IntershipEntity> findAllByStudentId(Integer studentId);

    @Query("SELECT AVG(intership.rating) FROM IntershipEntity as intership WHERE company.id = ?1")
    Double calculateRatingAverageByCompanyId(Integer companyId);
}
