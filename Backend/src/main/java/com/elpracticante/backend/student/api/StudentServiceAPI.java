package com.elpracticante.backend.student.api;

import com.elpracticante.backend.student.dto.*;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface StudentServiceAPI {

    CreateStudentResponse addStudent(CreateStudentRequest studentBodyDTO) throws IOException;

    GetStudentResponse getStudent(int studentId);

    UpdateStudentResponse updateStudent(int studentId, UpdateStudentRequest updateStudentRequest);

    void deleteStudent(int studentId);

    GetAllStudentsResponse getAllStudents();

    LoginStudentResponse postLogin(LoginStudentRequest loginStudentRequest);
}
