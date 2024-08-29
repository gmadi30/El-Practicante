package com.elpracticante.backend.shared.utils;

import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.internship.Internship;
import com.elpracticante.backend.internship.dto.CreateInternshipRequest;
import com.elpracticante.backend.internship.dto.Summarize;
import com.elpracticante.backend.internship.dto.SummarizeType;
import com.elpracticante.backend.internship.dto.Technology;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.internship.entity.SummarizeEntity;
import com.elpracticante.backend.internship.entity.TechnologyEntity;
import com.elpracticante.backend.internship.repository.InternshipRepository;
import com.elpracticante.backend.school.School;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.entity.StudentProfilePictureEntity;
import com.elpracticante.backend.shared.repository.StudentProfilePictureRepository;
import com.elpracticante.backend.student.Student;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.elpracticante.backend.shared.utils.DateUtils.getFormattedLocalDate;

public final class EntityHelperUtils {

   // private static final String FOLDER_PATH = "C:/Users/georg/Documents/El Practicante/Frontend/src/assets/img/";

    private static final Logger logger = LoggerFactory.getLogger(EntityHelperUtils.class);
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
                technologyEntity.getId(),
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
                new Company(null, studentEntity.getCompanyName()),
                studentEntity.getStudentProfilePicture().getName(),
                studentEntity.getBirthday()
        );
    }

    public static Company mapToCompany(CompanyEntity companyEntity) {
        return new Company(
                companyEntity.getId(),
                companyEntity.getName(),
                companyEntity.getRating(),
                companyEntity.getCity(),
                companyEntity.getEmail(),
                companyEntity.getAutonomousCommunity(),
                companyEntity.getEmployeesAmount(),
                companyEntity.getInternships().size(),
                companyEntity.getAboutUs(),
                companyEntity.getWhyUs(),
                companyEntity.getWebsite(),
                mapToIntershipList(companyEntity.getInternships()));
    }

    public static StudentProfilePictureEntity uploadProfilePicture(MultipartFile file, StudentProfilePictureRepository studentProfilePictureRepository) throws IOException {
        StudentProfilePictureEntity studentProfilePictureEntity = new StudentProfilePictureEntity();
        String filePath = FOLDER_PATH;
        if (null != file && !file.isEmpty()) {
            studentProfilePictureEntity.setName(file.getOriginalFilename());
            studentProfilePictureEntity.setType(file.getContentType());
            studentProfilePictureEntity.setPath(filePath + file.getOriginalFilename());

            byte[] bytes = file.getBytes();
            Path path = Paths.get(filePath + file.getOriginalFilename());
            Files.write(path, bytes);
        } else {
            logger.error("The file provided is empty and a default image will be provided");
            studentProfilePictureEntity.setName("NoProfilePicture.png");
            studentProfilePictureEntity.setType("png");
            studentProfilePictureEntity.setPath(filePath + "NoProfilePicture.png");
        }

        return studentProfilePictureRepository.save(studentProfilePictureEntity);
    }

    public static byte[] downloadProfilePicture(String fileName, StudentProfilePictureRepository studentProfilePictureRepository) throws IOException {
        Optional<StudentProfilePictureEntity> profilePictureEntityOptional = studentProfilePictureRepository.findByName(fileName);

        if (!profilePictureEntityOptional.isPresent()){
            throw new EntityNotFoundException("Profile picture not found");
        }
        String filePath = profilePictureEntityOptional.get().getPath();
        return Files.readAllBytes(new File(filePath).toPath());

    }

    public static List<Internship> mapToIntershipList(List<InternshipEntity> interships) {
        List<Internship> internshipList = new ArrayList<>();

        interships.forEach(internshipEntity -> internshipList.add(
                new Internship(
                        internshipEntity.getId(),
                        internshipEntity.getTitle(),
                        internshipEntity.getDescription(),
                        internshipEntity.getStartDate(),
                        internshipEntity.getEndDate(),
                        internshipEntity.getRating(),
                        new Degree(internshipEntity.getDegree().getId(), internshipEntity.getDegree().getName()),
                        new School(internshipEntity.getSchool().getId(), internshipEntity.getSchool().getName()),
                        new Company(internshipEntity.getCompany().getName(), internshipEntity.getCompany().getRating()),
                        mapToStudent(internshipEntity.getStudent()),
                        mapToTechonologiesList(internshipEntity.getTechnologies()),
                        mapToSummaryList(internshipEntity.getSummaries())
                )
        ));

        return internshipList;
    }

    public static void mapToCompanyList(List<CompanyEntity> companyEntityList, List<Company> companyList) {
        for (CompanyEntity companyEntity : companyEntityList) {
            companyList.add(mapToCompany(companyEntity));
        }
    }

    public static InternshipEntity createInternship(
            CreateInternshipRequest createInternshipRequest,
            CompanyEntity companyEntity,
            DegreeRepository degreeRepository,
            SchoolRepository schoolRepository,
            StudentRepository studentRepository) {
        InternshipEntity internshipEntity = new InternshipEntity();
        internshipEntity.setTitle(createInternshipRequest.title());
        internshipEntity.setDescription(createInternshipRequest.description());
        internshipEntity.setStartDate(getFormattedLocalDate(createInternshipRequest.startDate()));
        internshipEntity.setEndDate(getFormattedLocalDate(createInternshipRequest.endDate()));
        internshipEntity.setRating(createInternshipRequest.rating());
        internshipEntity.setDegree(EntityHelperUtils.getDegreeEntity(createInternshipRequest.degreeId(), degreeRepository));
        internshipEntity.setSchool(EntityHelperUtils.getSchoolEntity(createInternshipRequest.schoolId(), schoolRepository));
        internshipEntity.setStudent(EntityHelperUtils.getStudentEntityById(createInternshipRequest.studentId(), studentRepository));
        internshipEntity.setCompany(companyEntity);
        internshipEntity.setTechnologies(getTechnologiesList(createInternshipRequest.selectedTechnologies()));
        internshipEntity.setSummaries(getSummaries(createInternshipRequest.summaryBest(), createInternshipRequest.summaryWorst()));
        return internshipEntity;
    }

    public static List<SummarizeEntity> getSummaries(List<String> bestList, List<String> worstList) {
        List<SummarizeEntity> summarizeEntityList = new ArrayList<>();

        for(String best: bestList) {
            SummarizeEntity summarizeEntity = new SummarizeEntity();
            summarizeEntity.setName(best);
            summarizeEntity.setType(SummarizeType.BEST);
            summarizeEntityList.add(summarizeEntity);
        }

        for(String worst: worstList) {
            SummarizeEntity summarizeEntity = new SummarizeEntity();
            summarizeEntity.setName(worst);
            summarizeEntity.setType(SummarizeType.WORST);
            summarizeEntityList.add(summarizeEntity);
        }

        return summarizeEntityList;
    }

    public static List<TechnologyEntity> getTechnologiesList(List<Technology> technologies) {
        List<TechnologyEntity> technologyEntityList = new ArrayList<>();

        for(Technology technology: technologies) {
            if (null != technology) {
                TechnologyEntity technologyEntity = new TechnologyEntity();
                technologyEntity.setId(technology.id());
                technologyEntity.setName(technology.name());
                technologyEntityList.add(technologyEntity);
            }
        }

        return technologyEntityList;
    }
}
