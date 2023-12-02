package com.elpracticante.backend.student;

import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.internship.Internship;
import com.elpracticante.backend.internship.dto.Summarize;
import com.elpracticante.backend.internship.dto.Technology;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.internship.entity.SummarizeEntity;
import com.elpracticante.backend.internship.entity.TechnologyEntity;
import com.elpracticante.backend.school.School;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.dto.ProfilePicture;
import com.elpracticante.backend.shared.exceptions.WrongLoginCredentialsException;
import com.elpracticante.backend.shared.repository.StudentProfilePictureRepository;
import com.elpracticante.backend.shared.utils.EntityHelperUtils;
import com.elpracticante.backend.student.api.StudentServiceAPI;
import com.elpracticante.backend.student.dto.*;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import jakarta.persistence.EntityExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.elpracticante.backend.shared.utils.DateUtils.getFormattedLocalDate;
import static com.elpracticante.backend.shared.utils.EntityHelperUtils.*;


@Service
public class StudentService implements StudentServiceAPI {

    private final StudentRepository studentRepository;
    private final SchoolRepository schoolRepository;
    private final CompanyRepository companyRepository;
    private final DegreeRepository degreeRepository;
    private final StudentProfilePictureRepository profiePictureReposiroty;


    public StudentService(StudentRepository studentRepository, SchoolRepository schoolRepository, CompanyRepository companyRepository, DegreeRepository degreeRepository, StudentProfilePictureRepository profiePictureReposiroty) {
        this.studentRepository = studentRepository;
        this.schoolRepository = schoolRepository;
        this.companyRepository = companyRepository;
        this.degreeRepository = degreeRepository;
        this.profiePictureReposiroty = profiePictureReposiroty;
    }

    @Override
    public CreateStudentResponse addStudent(CreateStudentRequest createStudentRequest) throws IOException {
        validateInput(createStudentRequest);
        StudentEntity studentEntity = createStudentEntity(createStudentRequest);

        return new CreateStudentResponse(insertStudent(studentEntity));
    }

    @Override
    public GetStudentResponse getStudent(int studentId) {
        StudentEntity studentEntity = getStudentEntityById(studentId, studentRepository);
        return new GetStudentResponse(
                new Student(
                        studentEntity.getId(),
                        studentEntity.getName(),
                        studentEntity.getLastName(),
                        studentEntity.getEmail(),
                        studentEntity.getCity(),
                        studentEntity.getAutonomousCommunity(),
                        studentEntity.getMobile(),
                        studentEntity.getCompanyName(),
                        studentEntity.getStudentProfilePicture().getName()),
                        new School(studentEntity.getSchoolName()),
                        new Degree(studentEntity.getDegreeName()),
                        mapToIntership(studentEntity.getInternships()),
                        new ProfilePicture(studentEntity.getStudentProfilePicture().getName())
        );
    }

    private List<Internship> mapToIntership(List<InternshipEntity> interships) {
        List<Internship> internshipList = new ArrayList<>();
        for(InternshipEntity internshipEntity : interships) {
           internshipList.add( new Internship(
                    internshipEntity.getId(),
                    internshipEntity.getDescription(),
                    internshipEntity.getStartDate(),
                    internshipEntity.getEndDate(),
                    internshipEntity.getRating(),
                    new Degree(internshipEntity.getDegree().getId(), internshipEntity.getDegree().getName()),
                    new School(internshipEntity.getSchool().getId(), internshipEntity.getSchool().getName()),
                    new Company(internshipEntity.getCompany().getId(), internshipEntity.getCompany().getName(), internshipEntity.getCompany().getRating(), internshipEntity.getCompany().getInternships().size()),
                    new Student(internshipEntity.getStudent().getId(), internshipEntity.getStudent().getName(), internshipEntity.getStudent().getLastName(), internshipEntity.getStudent().getEmail(), internshipEntity.getStudent().getCity(), internshipEntity.getStudent().getAutonomousCommunity(), internshipEntity.getStudent().getMobile(), internshipEntity.getStudent().getCompanyName(), internshipEntity.getStudent().getStudentProfilePicture().getName()),
                    mapToTechnology(internshipEntity.getTechnologies()),
                    mapToSummarize(internshipEntity.getSummaries()))
           );
        }

        return internshipList;
    }

    private List<Summarize> mapToSummarize(List<SummarizeEntity> summaries) {
        List<Summarize> summarizeList = new ArrayList<>();
        for (SummarizeEntity summarizeEntity: summaries) {

            summarizeList.add(
                    new Summarize(summarizeEntity.getName(), summarizeEntity.getType())
            );
        }
        return summarizeList;
    }

    private List<Technology> mapToTechnology(List<TechnologyEntity> technologies) {
        List<Technology> technologyList = new ArrayList<>();
        for (TechnologyEntity technologyEntity: technologies) {

            technologyList.add(
                    new Technology(technologyEntity.getName())
            );
        }
        return technologyList;
    }

    @Override
    public UpdateStudentResponse updateStudent(int studentId, UpdateStudentRequest updateStudentRequest) {
        StudentEntity studentEntity = getStudentEntityById(studentId, studentRepository);

        studentEntity.setName(updateStudentRequest.name());
        studentEntity.setLastName(updateStudentRequest.lastName());
        studentRepository.save(studentEntity);

        return new UpdateStudentResponse(
                studentEntity.getName(),
                studentEntity.getLastName()
        );
    }

    @Override
    public void deleteStudent(int studentId) {
        StudentEntity studentEntity = getStudentEntityById(studentId, studentRepository);
        studentRepository.delete(studentEntity);
    }

    @Override
    public GetAllStudentsResponse getAllStudents() {
        List<StudentEntity> studentEntityList = studentRepository.findAll();
        List<Student> studentList = new ArrayList<>();

        studentEntityList.forEach(
               studentEntity -> studentList.add( new Student(
                       studentEntity.getId(),
                       studentEntity.getName(),
                       studentEntity.getLastName(),
                       studentEntity.getEmail(),
                       studentEntity.getCity(),
                       studentEntity.getAutonomousCommunity(),
                       studentEntity.getMobile(),
                       studentEntity.getCompanyName(),
                       studentEntity.getStudentProfilePicture().getName()
               ))
        );

        return new GetAllStudentsResponse(studentList);
    }

    @Override
    public LoginStudentResponse postLogin(LoginStudentRequest loginStudentRequest) {
        Optional<StudentEntity> studentEntity = studentRepository.findByEmail(loginStudentRequest.studentEmail());

        if (studentEntity.isEmpty()){
            throw new WrongLoginCredentialsException("El usuario o la contraseña son incorrectas", HttpStatus.NOT_FOUND);
        }

        if (!studentEntity.get().getPassword().equals(loginStudentRequest.password())) {
            throw new WrongLoginCredentialsException("El usuario o la contraseña son incorrectas", HttpStatus.NOT_FOUND);
        }

        return new LoginStudentResponse(studentEntity.get().getId());
    }


    private Integer insertStudent(StudentEntity studentEntity) {
        return studentRepository.save(studentEntity).getId();
    }

    private StudentEntity createStudentEntity(CreateStudentRequest createStudentRequest) throws IOException {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setName(createStudentRequest.name());
        studentEntity.setLastName(createStudentRequest.lastName());
        studentEntity.setDni(StringUtils.hasLength(createStudentRequest.dni()) ? createStudentRequest.dni() : null);
        studentEntity.setEmail(createStudentRequest.email());
        studentEntity.setPassword(createStudentRequest.password());
        studentEntity.setBirthday(getFormattedLocalDate(createStudentRequest.birthday()));
        studentEntity.setCity(createStudentRequest.city());
        studentEntity.setAutonomousCommunity(createStudentRequest.autonomousCommunity());
        studentEntity.setZipCode(createStudentRequest.zipcode());
        studentEntity.setMobile(StringUtils.hasLength(createStudentRequest.mobile()) ? createStudentRequest.mobile() : null);
        studentEntity.setSchoolName(getSchoolEntity(createStudentRequest.schoolId(), schoolRepository).getName());
        studentEntity.setDegreeName(getDegreeEntity(createStudentRequest.degreeId(), degreeRepository).getName());
        studentEntity.setCompanyName(EntityHelperUtils.getCompanyEntity(createStudentRequest.companyId(), companyRepository).getName());
        studentEntity.setStudentProfilePicture(uploadProfilePicture(createStudentRequest.profilePicture(), profiePictureReposiroty));
        return studentEntity;
    }

    private void validateInput(CreateStudentRequest createStudentRequest) {

       if (studentRepository.existsByDni(createStudentRequest.dni())) {
           throw new EntityExistsException("A user with that DNI already exists");
       }
       if (studentRepository.existsByMobile(createStudentRequest.mobile())){
           throw new EntityExistsException("A user with that mobile already exists");
       };
       if (studentRepository.existsByEmail(createStudentRequest.email())){
            throw new EntityExistsException("A user with that email already exists");
       };




    }
}
