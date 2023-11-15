package com.elpracticante.backend.shared.utils;

import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;

import java.util.Optional;

public final class EntityHelperUtils {

    private EntityHelperUtils() {
    }

    public static StudentEntity getStudentEntityById(int studentId, StudentRepository studentRepository) {
        Optional<StudentEntity> studentEntity = studentRepository.findById(studentId);

        if (studentEntity.isPresent()) {
            return studentEntity.get();
        }
        throw new EntityNotFoundException("No record was found in the STUDENT table by the given ID");

    }

    public static  DegreeEntity getDegreeEntity(int degreeId, DegreeRepository degreeRepository) {
        Optional<DegreeEntity> degree = degreeRepository.findById(degreeId);

        if (degree.isEmpty()){
            throw new EntityNotFoundException("No record was found in the DEGREE table by the given ID");
        }
        return degree.get();
    }

    public static SchoolEntity getSchoolEntity(int schoolId, SchoolRepository schoolRepository) {
        Optional<SchoolEntity> school = schoolRepository.findById(schoolId);
        if (school.isEmpty()){
            throw new EntityNotFoundException("No record was found in the SCHOOL table by the given ID");
        }
        return school.get();
    }

    public static CompanyEntity getCompanyEntity(int companyId, CompanyRepository companyRepository) {
        Optional<CompanyEntity> companyEntity = companyRepository.findById(companyId);

        if (companyEntity.isEmpty()){
            throw new EntityNotFoundException("No record was found in the COMPANY table by the given ID");
        }
        return companyEntity.get();
    }

}
