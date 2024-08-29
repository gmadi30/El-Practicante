package com.elpracticante.backend.internship;

import com.elpracticante.backend.internship.dto.*;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/internships")
public class InternshipController {

    @NonNull
    private final InternshipService service;

    public InternshipController(InternshipService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CreateInternshipResponse> addIntership(@RequestBody CreateInternshipRequest createInternshipRequest) {
        CreateInternshipResponse createInternshipResponse = service.addIntership(createInternshipRequest);
        return new ResponseEntity<>(createInternshipResponse, HttpStatus.CREATED);
    }

    @PutMapping(path = "/{internshipId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateInternship(@RequestBody UpdateInternshipRequest updateInternshipRequest, @PathVariable int internshipId) {
        service.updateInternship(updateInternshipRequest, internshipId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(path = "/{internshipId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GetInternshipResponse> getIntership(@PathVariable Integer internshipId) {
        GetInternshipResponse getInternshipResponse = service.getIntership(internshipId);
        return new ResponseEntity<>(getInternshipResponse, HttpStatus.OK);
    }

    @GetMapping(path = "/technologies")
    public ResponseEntity<Technologies> getTechnologies() {
        Technologies getTechnologies = service.getTechnologies();
        return new ResponseEntity<>(getTechnologies, HttpStatus.OK);
    }

    @GetMapping(path = "/{internshipId}/technologies")
    public ResponseEntity<List<Technology>> getTechnologiesByInternship(@PathVariable Integer internshipId) {
        List<Technology> getTechnologies = service.getTechnologiesByInternship(internshipId);
        return new ResponseEntity<>(getTechnologies, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{internshipId}/technology/{technologyId}")
    public ResponseEntity<Void> deleteTechnology(@PathVariable Integer internshipId, @PathVariable Integer technologyId) {
        service.deleteTechnology(internshipId, technologyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

