package com.elpracticante.backend.internship.api;

import com.elpracticante.backend.internship.dto.CreateInternshipRequest;
import com.elpracticante.backend.internship.dto.CreateInternshipResponse;
import com.elpracticante.backend.internship.dto.GetInternshipResponse;
import com.elpracticante.backend.internship.dto.GetTechnologies;


public interface InternshipServiceAPI {

    CreateInternshipResponse addIntership(CreateInternshipRequest createInternshipRequest);


    GetInternshipResponse getIntership(Integer intershipId);

    GetTechnologies getTechnologies();

    void deleteTechnology(Integer intershipId, Integer technologyId);
}
