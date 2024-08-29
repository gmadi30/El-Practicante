package com.elpracticante.backend.internship.api;

import com.elpracticante.backend.internship.dto.*;

import java.util.List;


public interface InternshipServiceAPI {

    CreateInternshipResponse addIntership(CreateInternshipRequest createInternshipRequest);


    GetInternshipResponse getIntership(Integer intershipId);

    Technologies getTechnologies();

    void deleteTechnology(Integer intershipId, Integer technologyId);

    void updateInternship(UpdateInternshipRequest updateInternshipRequest, Integer internshipId);

    List<Technology> getTechnologiesByInternship(Integer internshipId);

}
