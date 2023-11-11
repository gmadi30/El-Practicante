package com.elpracticante.backend.student;

import com.elpracticante.backend.company.dto.CompanyDTO;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.school.dto.SchoolDTO;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.exceptions.WrongLoginCredentialsException;
import com.elpracticante.backend.student.api.StudentServiceAPI;
import com.elpracticante.backend.student.dto.*;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class StudentService implements StudentServiceAPI {

    private final StudentRepository studentRepository;

    private final SchoolRepository schoolRepository;

    private final DegreeRepository degreeRepository;

    private final CompanyRepository companyRepository;

    public StudentService(StudentRepository studentRepository, SchoolRepository schoolRepository, DegreeRepository degreeRepository, CompanyRepository companyRepository) {
        this.studentRepository = studentRepository;
        this.schoolRepository = schoolRepository;
        this.degreeRepository = degreeRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public CreateStudentResponse addStudent(CreateStudentRequest createStudentRequest) throws EmptyInputFieldException {

        validateInput(createStudentRequest);
        StudentEntity studentEntity = createStudentEntity(createStudentRequest);

        return new CreateStudentResponse(insertStudent(studentEntity));
    }

    @Override
    public GetStudentResponse getStudent(int studentId) {
        StudentEntity studentEntity = getStudentEntityById(studentId);

        return new GetStudentResponse(
                studentEntity.getName(),
                studentEntity.getLastName(),
                new CompanyDTO(
                        studentEntity.getCompany().getId(),
                        studentEntity.getCompany().getName()),
                new SchoolDTO(
                        studentEntity.getSchool().getId(),
                        studentEntity.getSchool().getName()),
                new DegreeDTO(
                        studentEntity.getDegree().getId(),
                        studentEntity.getDegree().getName())
        );
    }

    @Override
    public UpdateStudentResponse updateStudent(int studentId, UpdateStudentRequest updateStudentRequest) {
        StudentEntity studentEntity = getStudentEntityById(studentId);

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
        StudentEntity studentEntity = getStudentEntityById(studentId);
        studentRepository.delete(studentEntity);
    }

    @Override
    public GetAllStudentsResponse getAllStudents() {
        List<StudentEntity> studentEntityList = studentRepository.findAll();
        List<Student> studentList = new ArrayList<>();

        studentEntityList.forEach(
               studentEntity -> {
                   studentList.add( new Student(
                           studentEntity.getId(),
                           studentEntity.getName(),
                           studentEntity.getLastName(),
                           studentEntity.getEmail(),
                           studentEntity.getCity(),
                           studentEntity.getAutonomousCommunity(),
                           studentEntity.getMobile(),
                           new CompanyDTO(
                                   studentEntity.getCompany().getId(),
                                   studentEntity.getCompany().getName()
                           ),
                           new SchoolDTO(
                                   studentEntity.getSchool().getId(),
                                   studentEntity.getSchool().getName()
                           ),
                           new DegreeDTO(
                                   studentEntity.getDegree().getId(),
                                   studentEntity.getDegree().getName()
                           )

                   ));
               }
        );

        return new GetAllStudentsResponse(studentList);
    }

    @Override
    public LoginStudentResponse postLogin(LoginStudentRequest loginStudentRequest) {
        Optional<StudentEntity> studentEntity = studentRepository.findByEmail(loginStudentRequest.studentEmail());

        if (!studentEntity.isPresent()){
            throw new WrongLoginCredentialsException("El usuario o la contraseña son incorrectas", HttpStatus.NOT_FOUND);
        }

        if (!studentEntity.get().getPassword().equals(loginStudentRequest.password())) {
            throw new WrongLoginCredentialsException("El usuario o la contraseña son incorrectas", HttpStatus.NOT_FOUND);
        }

        LoginStudentResponse loginStudentResponse = new LoginStudentResponse(studentEntity.get().getId());
        return loginStudentResponse;
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
        studentEntity.setSchool(getSchoolEntity(Integer.parseInt(createStudentRequest.school())).get());
        studentEntity.setDegree(getDegreeEntity(Integer.parseInt(createStudentRequest.degree())).get());
        studentEntity.setCompany(getCompanyEntity(Integer.parseInt(createStudentRequest.company())).get());

        return studentEntity;
    }

    private static LocalDate getFormattedLocalDate(String createStudentRequest) {
        LocalDate birthday = LocalDate.parse(createStudentRequest);
        return birthday;
    }

    private StudentEntity getStudentEntityById(int studentId) {
        Optional<StudentEntity> studentEntity = studentRepository.findById(studentId);

       if (studentEntity.isPresent()) {
           return studentEntity.get();
       }
        throw new EntityNotFoundException("No record was found in the STUDENT table by the given ID");

    }

    private Optional<DegreeEntity> getDegreeEntity(int degreeId) {
        Optional<DegreeEntity> degree = degreeRepository.findById(degreeId);

        if (degree.isEmpty()){
            throw new EntityNotFoundException("No record was found in the DEGREE table by the given ID");
        }
        return degree;
    }

    private Optional<SchoolEntity> getSchoolEntity(int schoolId) {
        Optional<SchoolEntity> school = schoolRepository.findById(schoolId);
        if (school.isEmpty()){
            throw new EntityNotFoundException("No record was found in the SCHOOL table by the given ID");
        }
        return school;
    }

    private Optional<CompanyEntity> getCompanyEntity(int companyId) {
        Optional<CompanyEntity> companyEntity = companyRepository.findById(companyId);

        if (companyEntity.isEmpty()){
            throw new EntityNotFoundException("No record was found in the COMPANY table by the given ID");
        }
        return companyEntity;
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
