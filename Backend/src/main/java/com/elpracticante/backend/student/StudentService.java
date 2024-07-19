package com.elpracticante.backend.student;

import com.elpracticante.backend.auth.TokenService;
import com.elpracticante.backend.company.Company;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.internship.Internship;
import com.elpracticante.backend.internship.dto.Summarize;
import com.elpracticante.backend.internship.dto.Technology;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.internship.entity.SummarizeEntity;
import com.elpracticante.backend.internship.entity.TechnologyEntity;
import com.elpracticante.backend.internship.repository.InternshipRepository;
import com.elpracticante.backend.school.School;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.dto.ProfilePicture;
import com.elpracticante.backend.shared.dto.errors.DniExistsException;
import com.elpracticante.backend.shared.dto.errors.EmailExistsException;
import com.elpracticante.backend.shared.entity.FeedbackEntriesEntity;
import com.elpracticante.backend.shared.exceptions.UserNotFoundException;
import com.elpracticante.backend.shared.repository.FeedbackEntriesRepository;
import com.elpracticante.backend.shared.repository.StudentProfilePictureRepository;
import com.elpracticante.backend.shared.utils.Constants;
import com.elpracticante.backend.shared.utils.EntityHelperUtils;
import com.elpracticante.backend.shared.utils.ErrorCodeConstants;
import com.elpracticante.backend.shared.utils.Utils;
import com.elpracticante.backend.student.api.StudentServiceAPI;
import com.elpracticante.backend.student.dto.*;
import com.elpracticante.backend.student.entity.StudentEntity;
import com.elpracticante.backend.student.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
    private final StudentProfilePictureRepository studentProfilePictureRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final InternshipRepository internshipRepository;
    private final FeedbackEntriesRepository feedbackEntriesRepository;


    public StudentService(StudentRepository studentRepository, SchoolRepository schoolRepository, CompanyRepository companyRepository, DegreeRepository degreeRepository, StudentProfilePictureRepository TelepicturesRepository, PasswordEncoder passwordEncoder, TokenService tokenService, InternshipRepository internshipRepository, FeedbackEntriesRepository feedbackEntriesRepository) {
        this.studentRepository = studentRepository;
        this.schoolRepository = schoolRepository;
        this.companyRepository = companyRepository;
        this.degreeRepository = degreeRepository;
        this.studentProfilePictureRepository = TelepicturesRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.internshipRepository = internshipRepository;
        this.feedbackEntriesRepository = feedbackEntriesRepository;
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
        Optional<SchoolEntity> schoolEntity = schoolRepository.findByName(studentEntity.getSchoolName());
        Optional<DegreeEntity> degreeEntity = degreeRepository.findByName(studentEntity.getDegreeName());
        Optional<CompanyEntity> companyEntity = companyRepository.findByName(studentEntity.getCompanyName());

        return new GetStudentResponse(
                new Student(
                        studentEntity.getId(),
                        studentEntity.getName(),
                        studentEntity.getLastName(),
                        studentEntity.getEmail(),
                        studentEntity.getCity(),
                        studentEntity.getAutonomousCommunity(),
                        studentEntity.getMobile(),
                        new Company(companyEntity.get().getId(), companyEntity.get().getName()),
                        studentEntity.getStudentProfilePicture().getName(),  studentEntity.getBirthday()),
                        new School(schoolEntity.get().getId(), schoolEntity.get().getName()),
                        new Degree(degreeEntity.get().getId(), degreeEntity.get().getName()),
                        mapToIntership(studentEntity.getInternships()),
                        new ProfilePicture(studentEntity.getStudentProfilePicture().getName())
        );
    }

    private List<Internship> mapToIntership(List<InternshipEntity> interships) {
        List<Internship> internshipList = new ArrayList<>();
        for(InternshipEntity internshipEntity : interships) {
           internshipList.add( new Internship(
                    internshipEntity.getId(),
                    internshipEntity.getTitle(),
                    internshipEntity.getDescription(),
                    internshipEntity.getStartDate(),
                    internshipEntity.getEndDate(),
                    internshipEntity.getRating(),
                    new Degree(internshipEntity.getDegree().getId(), internshipEntity.getDegree().getName()),
                    new School(internshipEntity.getSchool().getId(), internshipEntity.getSchool().getName()),
                    new Company(internshipEntity.getCompany().getId(), internshipEntity.getCompany().getName(), internshipEntity.getCompany().getRating(), internshipEntity.getCompany().getInternships().size()),
                    new Student(internshipEntity.getStudent().getId(), internshipEntity.getStudent().getName(), internshipEntity.getStudent().getLastName(), internshipEntity.getStudent().getEmail(), internshipEntity.getStudent().getCity(), internshipEntity.getStudent().getAutonomousCommunity(), internshipEntity.getStudent().getMobile(), new Company(null, internshipEntity.getStudent().getCompanyName()), internshipEntity.getStudent().getStudentProfilePicture().getName(),  internshipEntity.getStudent().getBirthday()),
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
                    new Technology(technologyEntity.getId(), technologyEntity.getName())
            );
        }
        return technologyList;
    }

    @Override
    public void updateStudent(UpdateStudentRequest updateStudentRequest) throws IOException {
        StudentEntity studentEntity = getStudentEntityById(updateStudentRequest.studentId(), studentRepository);

       if (updateStudentRequest.name() != null) {
           studentEntity.setName(updateStudentRequest.name());
       } else if (updateStudentRequest.lastName() != null) {
           studentEntity.setLastName(updateStudentRequest.lastName());
       } else if (updateStudentRequest.email() != null) {
           studentEntity.setEmail(updateStudentRequest.email());
       } else if (updateStudentRequest.birthday() != null) {
           studentEntity.setBirthday(getFormattedLocalDate(updateStudentRequest.birthday()));
       } else if (updateStudentRequest.profilePicture() != null) {
           studentEntity.setStudentProfilePicture(uploadProfilePicture(updateStudentRequest.profilePicture(), studentProfilePictureRepository));
       } else if (updateStudentRequest.mobile() != null) {
           studentEntity.setMobile(updateStudentRequest.mobile());
       } else if (updateStudentRequest.schoolId() != null) {
           studentEntity.setName(EntityHelperUtils.getCompanyEntity(updateStudentRequest.companyId(), companyRepository).getName());
       } else if (updateStudentRequest.degreeId() != null) {
           studentEntity.setName(EntityHelperUtils.getSchoolEntity(updateStudentRequest.schoolId(), schoolRepository).getName());
       } else if (updateStudentRequest.companyId() != null) {
           studentEntity.setName(EntityHelperUtils.getCompanyEntity(updateStudentRequest.companyId(), companyRepository).getName());
       }

       studentRepository.save(studentEntity);
    }

    @Override
    @Transactional
    public void deleteStudent(int studentId, DeleteStudentRequest body) {
        // Retrieve student
        StudentEntity studentEntity = getStudentEntityById(studentId, studentRepository);
        // Retrieve company
        CompanyEntity companyEntity = companyRepository.findByName(studentEntity.getCompanyName()).get();
        // Delete student
        studentRepository.delete(studentEntity);
        // Update the companies rating
        Utils.updateRatingCompanyEntity(companyEntity, internshipRepository);
        // Save company changes - maybe not needed
        companyRepository.save(companyEntity);
        // Save student feedback
        if (!"".equals(body.feedback())) {
           FeedbackEntriesEntity feedbackEntriesEntity = new FeedbackEntriesEntity();
           feedbackEntriesEntity.setFeedback(body.feedback());
           feedbackEntriesRepository.save(feedbackEntriesEntity);
        }
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
                       new Company(null, studentEntity.getCompanyName()),
                       studentEntity.getStudentProfilePicture().getName(),
                       studentEntity.getBirthday()
               ))
        );

        return new GetAllStudentsResponse(studentList);
    }

    @Override
    public LoginStudent postLogin(LoginStudentRequest loginStudentRequest) {
        Optional<StudentEntity> studentEntity = studentRepository.findByEmail(loginStudentRequest.studentEmail());

        if (studentEntity.isEmpty()) {
            throw new UserNotFoundException("El usuario o la contraseña son incorrectas");
        }

        if (!passwordEncoder.matches(loginStudentRequest.password(), studentEntity.get().getPassword())) {
            throw new UserNotFoundException("El usuario o la contraseña son incorrectas");
        }

        System.out.println("Login password: " + loginStudentRequest.password());
        System.out.println("Database Stored password: " + studentEntity.get().getPassword());

        String token = tokenService.generateToken(new UsernamePasswordAuthenticationToken(
                studentEntity.get().getEmail(),
                studentEntity.get().getPassword()
        ) );

        System.out.println("Token generated: " + token);

        tokenService.tokenDecoder(token);

        return new LoginStudent(studentEntity.get().getId(), token);
    }


    private Integer insertStudent(StudentEntity studentEntity) {
        return studentRepository.save(studentEntity).getId();
    }

    private StudentEntity createStudentEntity(CreateStudentRequest createStudentRequest) throws IOException {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setName(createStudentRequest.name());
        studentEntity.setLastName(createStudentRequest.lastName());
       // studentEntity.setDni(StringUtils.hasLength(createStudentRequest.dni()) ? createStudentRequest.dni() : null);
        studentEntity.setEmail(createStudentRequest.email());
        String hashedPassword = passwordEncoder.encode(createStudentRequest.password());
        System.out.println("Hashed Password: " + hashedPassword);
        studentEntity.setPassword(hashedPassword);
        studentEntity.setBirthday(getFormattedLocalDate(createStudentRequest.birthday()));
        studentEntity.setCity(createStudentRequest.city());
        studentEntity.setAutonomousCommunity(createStudentRequest.autonomousCommunity());
        studentEntity.setZipCode(createStudentRequest.zipcode());
        studentEntity.setMobile(StringUtils.hasLength(createStudentRequest.mobile()) ? createStudentRequest.mobile() : null);
        studentEntity.setSchoolName(getSchoolEntity(createStudentRequest.schoolId(), schoolRepository).getName());
        studentEntity.setDegreeName(getDegreeEntity(createStudentRequest.degreeId(), degreeRepository).getName());
        studentEntity.setCompanyName(EntityHelperUtils.getCompanyEntity(createStudentRequest.companyId(), companyRepository).getName());
        studentEntity.setStudentProfilePicture(uploadProfilePicture(createStudentRequest.profilePicture(), studentProfilePictureRepository));
        studentEntity.setPrivacyPolicyAcceptance(createStudentRequest.privacyPolicy().equals(Constants.TRUE) ? true : false);
        studentEntity.setDatePrivacyPolicyAcceptance(LocalDateTime.ofInstant(Instant.now(), ZoneId.of(Constants.ZONE_ID_EUROPE_PARIS)));
        studentEntity.setPrivacyPolicyVersion(Constants.PRIVACY_POLICY_VERSION);
        return studentEntity;
    }

    private void validateInput(CreateStudentRequest createStudentRequest) {

        /*
       if (studentRepository.existsByDni(createStudentRequest.dni())) {
           throw new DniExistsException(ErrorCodeConstants.SIGNUP_VALIDATION_DNI_EXISTS_101, ErrorCodeConstants.SIGNUP_VALIDATION_DNI_EXISTS_101_CODE );
       }
       */

        if (studentRepository.existsByEmail(createStudentRequest.email())){
            throw new EmailExistsException(ErrorCodeConstants.SIGNUP_VALIDATION_EMAIL_EXISTS_102, ErrorCodeConstants.SIGNUP_VALIDATION_EMAIL_EXISTS_102_CODE );
        }

        if (studentRepository.existsByMobile(createStudentRequest.mobile())){
           throw new DniExistsException(ErrorCodeConstants.SIGNUP_VALIDATION_MOBILE_EXISTS_103, ErrorCodeConstants.SIGNUP_VALIDATION_MOBILE_EXISTS_103_CODE);
       }

    }
}
