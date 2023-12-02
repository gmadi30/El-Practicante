package com.elpracticante.backend.student.dto;

import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.internship.Internship;
import com.elpracticante.backend.school.School;
import com.elpracticante.backend.shared.dto.ProfilePicture;
import com.elpracticante.backend.student.Student;

import java.util.List;

public record GetStudentResponse (

        Student student,

        School school,

        Degree degree,

        List<Internship> internships,

        ProfilePicture profilePicture

) {

}
