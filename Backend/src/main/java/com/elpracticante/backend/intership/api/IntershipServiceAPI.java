package com.elpracticante.backend.intership.api;

import com.elpracticante.backend.intership.dto.CreateIntershipRequest;
import com.elpracticante.backend.intership.dto.CreateIntershipResponse;
import com.elpracticante.backend.intership.dto.GetIntershipResponse;
import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;


public interface IntershipServiceAPI {

    CreateIntershipResponse addIntership(CreateIntershipRequest createIntershipRequest) throws EmptyInputFieldException;


    GetIntershipResponse getIntership(Integer intershipId);
}
