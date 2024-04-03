package com.elpracticante.backend.student.api;

import com.elpracticante.backend.student.dto.*;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface StudentServiceAPI {

    CreateStudentResponse addStudent(CreateStudentRequest studentBodyDTO) throws IOException;

    GetStudentResponse getStudent(int studentId);

    void updateStudent(UpdateStudentRequest updateStudentRequest) throws IOException;

    void deleteStudent(int studentId, DeleteStudentRequest body);

    GetAllStudentsResponse getAllStudents();

    LoginStudent postLogin(LoginStudentRequest loginStudentRequest);
}
