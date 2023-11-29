package com.elpracticante.backend.shared.utils;

import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.internship.dto.Summarize;
import com.elpracticante.backend.internship.dto.Technology;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.internship.entity.SummarizeEntity;
import com.elpracticante.backend.internship.entity.TechnologyEntity;
import com.elpracticante.backend.internship.repository.InternshipRepository;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.entity.ProfilePictureEntity;
import com.elpracticante.backend.shared.repository.ProfilePictureRepository;
import com.elpracticante.backend.student.Student;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public final class EntityHelperUtils {

   // private static final String FOLDER_PATH = "C:/Users/georg/Documents/El Practicante/Frontend/src/assets/img/";

    private static final String FOLDER_PATH ="/Users/georg/Documents/El Practicante/Frontend/src/assets/students/";
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

    public static InternshipEntity getIntershipEntity(Integer companyId, InternshipRepository internshipRepository) {
        Optional<InternshipEntity> intershipEntityOptional = internshipRepository.findById(companyId);

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
                studentEntity.getCompanyName(),
                studentEntity.getProfilePicture().getName()
        );
    }

    public static Company mapToCompany(CompanyEntity companyEntity) {
        return new Company(
                companyEntity.getId(),
                companyEntity.getName(),
                companyEntity.getRating(),
                companyEntity.getCity(),
                companyEntity.getAutonomousCommunity(),
                companyEntity.getInternships().size()
        );
    }

    public static ProfilePictureEntity uploadProfilePicture(MultipartFile file, ProfilePictureRepository profilePictureRepository) throws IOException {
        ProfilePictureEntity profilePictureEntity = new ProfilePictureEntity();
        String filePath = FOLDER_PATH;
        if (null != file) {
            if (file.isEmpty()) {
                throw new NoSuchFileException("The file provided is empty");
            }

            profilePictureEntity.setName(file.getOriginalFilename());
            profilePictureEntity.setType(file.getContentType());
            profilePictureEntity.setPath(filePath + file.getOriginalFilename());

            byte[] bytes = file.getBytes();
            Path path = Paths.get(filePath + file.getOriginalFilename());
            Files.write(path, bytes);



        } else {
            profilePictureEntity.setName("NoProfilePicture.png");
            profilePictureEntity.setType("png");
            profilePictureEntity.setPath(filePath + "NoProfilePicture.png");
        }



        ProfilePictureEntity entitySaved = profilePictureRepository.save(profilePictureEntity);

        return entitySaved;
    }

    public static byte[] downloadProfilePicture(String fileName, ProfilePictureRepository profilePictureRepository) throws IOException {
        Optional<ProfilePictureEntity> profilePictureEntityOptional = profilePictureRepository.findByName(fileName);

        if (!profilePictureEntityOptional.isPresent()){
            throw new EntityNotFoundException("Profile picture not found");
        }
        String filePath = profilePictureEntityOptional.get().getPath();
        byte[] image = Files.readAllBytes(new File(filePath).toPath());
        return image;

    }
}
