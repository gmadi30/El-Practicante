package com.elpracticante.backend.student.dto;

import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.internship.Internship;
import com.elpracticante.backend.school.dto.SchoolDTO;
import com.elpracticante.backend.shared.dto.ProfilePicture;
import com.elpracticante.backend.student.Student;

import java.util.List;

public record GetStudentResponse (

        Student student,

        SchoolDTO schoolDTO,

        DegreeDTO degreeDTO,

        List<Internship> internships,

        ProfilePicture profilePicture

) {

}
