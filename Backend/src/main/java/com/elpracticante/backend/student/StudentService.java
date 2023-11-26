package com.elpracticante.backend.student;

import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.internship.Internship;
import com.elpracticante.backend.internship.dto.Summarize;
import com.elpracticante.backend.internship.dto.Technology;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.internship.entity.SummarizeEntity;
import com.elpracticante.backend.internship.entity.TechnologyEntity;
import com.elpracticante.backend.school.dto.SchoolDTO;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;
import com.elpracticante.backend.shared.exceptions.WrongLoginCredentialsException;
import com.elpracticante.backend.student.api.StudentServiceAPI;
import com.elpracticante.backend.student.dto.*;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.elpracticante.backend.shared.utils.DateUtils.getFormattedLocalDate;
import static com.elpracticante.backend.shared.utils.EntityHelperUtils.*;


@Service
public class StudentService implements StudentServiceAPI {

    private final StudentRepository studentRepository;
    private final SchoolRepository schoolRepository;

    private final DegreeRepository degreeRepository;


    public StudentService(StudentRepository studentRepository, SchoolRepository schoolRepository, DegreeRepository degreeRepository) {
        this.studentRepository = studentRepository;
        this.schoolRepository = schoolRepository;
        this.degreeRepository = degreeRepository;
    }

    @Override
    public CreateStudentResponse addStudent(CreateStudentRequest createStudentRequest) throws EmptyInputFieldException {
       // validateInput(createStudentRequest);
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
                        studentEntity.getCompanyName()),
                new SchoolDTO(studentEntity.getSchool().getId(), studentEntity.getSchool().getName()),
                new DegreeDTO(studentEntity.getDegree().getId(), studentEntity.getDegree().getName()),
                mapToIntership(studentEntity.getInterships())
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
                    internshipEntity.getDegreeName(),
                    internshipEntity.getSchoolName(),
                    new Company(internshipEntity.getCompany().getId(), internshipEntity.getCompany().getName(), internshipEntity.getCompany().getRating(), internshipEntity.getCompany().getInternships().size()),
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
                       studentEntity.getCompanyName()
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

    private StudentEntity createStudentEntity(CreateStudentRequest createStudentRequest) {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setName(createStudentRequest.name());
        studentEntity.setLastName(createStudentRequest.lastName());
        studentEntity.setDni(StringUtils.hasLength(createStudentRequest.DNI()) ? createStudentRequest.DNI() : null);
        studentEntity.setEmail(createStudentRequest.email());
        studentEntity.setPassword(createStudentRequest.password());
        studentEntity.setBirthday(getFormattedLocalDate(createStudentRequest.birthDay()));
        studentEntity.setCity(createStudentRequest.city());
        studentEntity.setAutonomousCommunity(createStudentRequest.autonomousCommunity());
        studentEntity.setZipCode(createStudentRequest.zipCode());
        studentEntity.setMobile(StringUtils.hasLength(createStudentRequest.mobile()) ? createStudentRequest.mobile() : null);
        studentEntity.setSchool(getSchoolEntity(Integer.parseInt(createStudentRequest.school()), schoolRepository));
        studentEntity.setDegree(getDegreeEntity(Integer.parseInt(createStudentRequest.degree()), degreeRepository));
        studentEntity.setCompanyName(createStudentRequest.companyName());

        return studentEntity;
    }





    private void validateInput(CreateStudentRequest createStudentRequest) throws EmptyInputFieldException {

        if (!StringUtils.hasLength(createStudentRequest.name())){
            throw new EmptyInputFieldException("Input field name cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.hasLength(createStudentRequest.lastName())){
            throw new EmptyInputFieldException("Input field lastname cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.hasLength(createStudentRequest.email())){
            throw new EmptyInputFieldException("Input field email cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.hasLength(createStudentRequest.password())){
            throw new EmptyInputFieldException("Input field password cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.hasLength(createStudentRequest.city())){
            throw new EmptyInputFieldException("Input field city cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.hasLength(createStudentRequest.autonomousCommunity())){
            throw new EmptyInputFieldException("Input field autonomousCommunity cannot be empty", HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.hasLength(createStudentRequest.zipCode())){
            throw new EmptyInputFieldException("Input field zipCode cannot be empty", HttpStatus.BAD_REQUEST);
        }


    }
}
