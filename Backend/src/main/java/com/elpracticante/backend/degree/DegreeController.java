package com.elpracticante.backend.degree;

import com.elpracticante.backend.degree.dto.CreateDegreeRequest;
import com.elpracticante.backend.degree.dto.CreateDegreeResponse;
import com.elpracticante.backend.degree.dto.GetDegreesResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/v1/degrees")
@CrossOrigin()
public class DegreeController {

    private final DegreeService degreeService;

    public DegreeController(DegreeService degreeService) {
        this.degreeService = degreeService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CreateDegreeResponse> addDegree(@RequestBody CreateDegreeRequest createDegreeRequest) {
        CreateDegreeResponse createDegreeResponse = degreeService.addScool(createDegreeRequest);
        return new ResponseEntity<>(createDegreeResponse, HttpStatus.CREATED);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GetDegreesResponse> getDegrees() {
        GetDegreesResponse getDegreesResponse;
        try {
            getDegreesResponse = degreeService.getDegrees();
        }catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }

        return new ResponseEntity<>(getDegreesResponse, HttpStatus.OK);
    }
}
