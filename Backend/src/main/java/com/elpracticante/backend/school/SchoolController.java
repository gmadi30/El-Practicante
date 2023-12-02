package com.elpracticante.backend.school;

import com.elpracticante.backend.school.dto.CreateSchoolRequest;
import com.elpracticante.backend.school.dto.CreateSchoolResponse;
import com.elpracticante.backend.school.dto.GetSchoolsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/v1/schools")
@CrossOrigin()
public class SchoolController {

    private final SchoolService schoolService;

    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CreateSchoolResponse> addSchool(@RequestBody CreateSchoolRequest createSchoolRequest) {
        CreateSchoolResponse createSchoolResponse = schoolService.addScool(createSchoolRequest);
        return new ResponseEntity<>(createSchoolResponse, HttpStatus.CREATED);
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
