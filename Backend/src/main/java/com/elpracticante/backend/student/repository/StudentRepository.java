package com.elpracticante.backend.student.repository;

import com.elpracticante.backend.student.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Integer> {

    Optional<StudentEntity> findByEmail(String email);

    boolean existsByDni(String dni);

    boolean existsByMobile(String mobile);

    boolean existsByEmail(String email);
}
