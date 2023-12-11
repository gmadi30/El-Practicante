package com.elpracticante.backend.internship;

import com.elpracticante.backend.internship.dto.CreateInternshipRequest;
import com.elpracticante.backend.internship.dto.CreateInternshipResponse;
import com.elpracticante.backend.internship.dto.GetInternshipResponse;
import com.elpracticante.backend.internship.dto.GetTechnologies;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/internships")
@CrossOrigin()
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
    @GetMapping(path = "/{intershipId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GetInternshipResponse> getIntership(@PathVariable Integer intershipId) {
        GetInternshipResponse getInternshipResponse = service.getIntership(intershipId);
        return new ResponseEntity<>(getInternshipResponse, HttpStatus.OK);
    }

    @GetMapping(path = "/technologies")
    public ResponseEntity<GetTechnologies> getTechnologies() {
        GetTechnologies getTechnologies = service.getTechnologies();
        return new ResponseEntity<>(getTechnologies, HttpStatus.OK);
    }
}


