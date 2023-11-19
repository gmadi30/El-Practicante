package com.elpracticante.backend.intership.api;

import com.elpracticante.backend.intership.dto.CreateIntershipRequest;
import com.elpracticante.backend.intership.dto.CreateIntershipResponse;
import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;
import com.elpracticante.backend.student.dto.*;
import org.springframework.stereotype.Service;


public interface IntershipServiceAPI {

    CreateIntershipResponse addStudent(CreateIntershipRequest createIntershipRequest) throws EmptyInputFieldException;

    // GetStudentResponse getStudent(int studentId);

    // UpdateStudentResponse updateStudent(int studentId, UpdateStudentRequest updateStudentRequest);

    // void deleteStudent(int studentId);

    //  GetAllStudentsResponse getAllStudents();

    // LoginStudentResponse postLogin(LoginStudentRequest loginStudentRequest);
}
