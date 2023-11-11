package com.elpracticante.backend.student.api;

import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;
import com.elpracticante.backend.student.dto.*;
import org.springframework.stereotype.Service;

@Service
public interface StudentServiceAPI {

    CreateStudentResponse addStudent(CreateStudentRequest studentBodyDTO) throws EmptyInputFieldException;

    GetStudentResponse getStudent(int studentId);

    UpdateStudentResponse updateStudent(int studentId, UpdateStudentRequest updateStudentRequest);

    void deleteStudent(int studentId);

    GetAllStudentsResponse getAllStudents();

    LoginStudentResponse postLogin(LoginStudentRequest loginStudentRequest);
}
