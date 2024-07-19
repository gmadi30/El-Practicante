package com.elpracticante.backend.internship.api;

import com.elpracticante.backend.internship.dto.*;


public interface InternshipServiceAPI {

    CreateInternshipResponse addIntership(CreateInternshipRequest createInternshipRequest);


    GetInternshipResponse getIntership(Integer intershipId);

    GetTechnologies getTechnologies();

    void deleteTechnology(Integer intershipId, Integer technologyId);

    void updateInternship(UpdateInternshipRequest updateInternshipRequest, Integer internshipId);
}
