package com.elpracticante.backend.student.dto;

import com.elpracticante.backend.student.Student;
import com.elpracticante.backend.student.entity.StudentEntity;

import java.util.List;

public record GetAllStudentsResponse(
       List<Student> students
       ) {
}
