package com.elpracticante.backend.student;

import com.elpracticante.backend.student.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CreateStudentResponse> addStudent(@RequestBody CreateStudentRequest createStudentRequest) {
        CreateStudentResponse studentRequestOutput;
        try {
            studentRequestOutput = service.addStudent(createStudentRequest);
        }catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex.getCause());
        }

        return new ResponseEntity<>(studentRequestOutput, HttpStatus.CREATED);
    }

    @GetMapping(path = "/{studentId}", produces = "application/json")
    public ResponseEntity<GetStudentResponse> getStudent(@PathVariable int studentId) {
        GetStudentResponse getStudentResponse;
        try {
            getStudentResponse = service.getStudent(studentId);
        }catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }

        return new ResponseEntity<>(getStudentResponse, HttpStatus.OK);
    }


    @PutMapping(path = "/{studentId}")
    public ResponseEntity<UpdateStudentResponse> updateStudent(@PathVariable int studentId, @RequestBody UpdateStudentRequest updateStudentRequest) {
        UpdateStudentResponse updateStudentResponse;

        try {
            updateStudentResponse = service.updateStudent(studentId, updateStudentRequest);
        }catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }

        return new ResponseEntity<>(updateStudentResponse, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable int studentId) {

        try {
            service.deleteStudent(studentId);
        }catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping()
    public ResponseEntity<GetAllStudentsResponse> deleteStudent() {
        GetAllStudentsResponse getAllStudentsResponse = null;
        try {
            getAllStudentsResponse = service.getAllStudents();
        }catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
        return new ResponseEntity<>(getAllStudentsResponse, HttpStatus.OK);
    }


}
