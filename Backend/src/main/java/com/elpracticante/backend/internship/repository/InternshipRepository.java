package com.elpracticante.backend.internship.repository;

import com.elpracticante.backend.internship.entity.InternshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<InternshipEntity, Integer> {

    List<InternshipEntity> findAllByStudentId(Integer studentId);

    @Query("SELECT AVG(internship.rating) FROM InternshipEntity as internship WHERE company.id = ?1")
    Double calculateRatingAverageByCompanyId(Integer companyId);


}
