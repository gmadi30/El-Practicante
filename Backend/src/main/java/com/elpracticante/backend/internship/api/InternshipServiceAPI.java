package com.elpracticante.backend.internship.api;

import com.elpracticante.backend.internship.dto.CreateInternshipRequest;
import com.elpracticante.backend.internship.dto.CreateInternshipResponse;
import com.elpracticante.backend.internship.dto.GetInternshipResponse;


public interface InternshipServiceAPI {

    CreateInternshipResponse addIntership(CreateInternshipRequest createInternshipRequest);


    GetInternshipResponse getIntership(Integer intershipId);
}
