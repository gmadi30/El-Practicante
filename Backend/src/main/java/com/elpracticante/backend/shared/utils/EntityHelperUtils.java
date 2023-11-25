package com.elpracticante.backend.shared.utils;

import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.intership.dto.Summarize;
import com.elpracticante.backend.intership.dto.Technology;
import com.elpracticante.backend.intership.entity.IntershipEntity;
import com.elpracticante.backend.intership.entity.SummarizeEntity;
import com.elpracticante.backend.intership.entity.TechnologyEntity;
import com.elpracticante.backend.intership.repository.IntershipRepository;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.student.Student;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;

import java.util.ArrayList;
import java.util.List;
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

    public static IntershipEntity getIntershipEntity(Integer companyId, IntershipRepository intershipRepository) {
        Optional<IntershipEntity> intershipEntityOptional = intershipRepository.findById(companyId);

        if (!intershipEntityOptional.isPresent()) {
            throw new EntityNotFoundException("No record was found in the INTERSHIP table by the given ID");

        }

        return intershipEntityOptional.get();
    }

    public static List<Summarize> mapToSummaryList(List<SummarizeEntity> summaries) {
        List<Summarize> summarizeList = new ArrayList<>();

        summaries.forEach((summarizeEntity) -> summarizeList.add(new Summarize(
                summarizeEntity.getName(),
                summarizeEntity.getType()
        )));

        return summarizeList;
    }

    public static List<Technology> mapToTechonologiesList(List<TechnologyEntity> technologies) {
        List<Technology> technologyList = new ArrayList<>();

        technologies.forEach((technologyEntity) -> technologyList.add(new Technology(
                technologyEntity.getName()
        )));

        return technologyList;
    }

    public static Student mapToStudent(StudentEntity studentEntity) {

        return new Student(
                studentEntity.getId(),
                studentEntity.getName(),
                studentEntity.getLastName(),
                studentEntity.getCity(),
                studentEntity.getAutonomousCommunity(),
                studentEntity.getMobile(),
                null,
                studentEntity.getCompanyName()
        );
    }

    public static Company mapToCompany(CompanyEntity companyEntity) {
        return new Company(
                companyEntity.getId(),
                companyEntity.getName(),
                companyEntity.getRating(),
                companyEntity.getCity(),
                companyEntity.getAutonomousCommunity(),
                companyEntity.getInterships().size()
        );
    }

}
