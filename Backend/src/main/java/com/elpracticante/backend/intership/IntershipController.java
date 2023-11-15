package com.elpracticante.backend.intership;

import com.elpracticante.backend.intership.dto.CreateIntershipRequest;
import com.elpracticante.backend.intership.dto.CreateIntershipResponse;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/interships")
@CrossOrigin
public class IntershipController {

    @NonNull
    private final IntershipService service;

    public IntershipController(IntershipService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CreateIntershipResponse> addIntership(@RequestBody CreateIntershipRequest createIntershipRequest) {
        CreateIntershipResponse createIntershipResponse = service.addStudent(createIntershipRequest);
        return new ResponseEntity<>(createIntershipResponse, HttpStatus.OK);
    }
}
