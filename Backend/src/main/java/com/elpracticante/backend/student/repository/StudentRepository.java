package com.elpracticante.backend.student.repository;

import com.elpracticante.backend.student.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Integer> {
}
