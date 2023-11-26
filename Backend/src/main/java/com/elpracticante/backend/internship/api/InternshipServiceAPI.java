package com.elpracticante.backend.internship.api;

import com.elpracticante.backend.internship.dto.CreateInternshipRequest;
import com.elpracticante.backend.internship.dto.CreateInternshipResponse;
import com.elpracticante.backend.internship.dto.GetInternshipResponse;
import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;


public interface InternshipServiceAPI {

    CreateInternshipResponse addIntership(CreateInternshipRequest createInternshipRequest) throws EmptyInputFieldException;


    GetInternshipResponse getIntership(Integer intershipId);
}
