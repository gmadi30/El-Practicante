package com.elpracticante.backend.school;

import com.elpracticante.backend.school.dto.GetSchoolsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/v1/schools")
@CrossOrigin()
public class SchoolController {

    private final SchoolService schoolService;

    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GetSchoolsResponse> getSchools() {
        GetSchoolsResponse getSchoolsResponse;
        try {
            getSchoolsResponse = schoolService.getSchools();
        }catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }

        return new ResponseEntity<>(getSchoolsResponse, HttpStatus.OK);
    }
}
