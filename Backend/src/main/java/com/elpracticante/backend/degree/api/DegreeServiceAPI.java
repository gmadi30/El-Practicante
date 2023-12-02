package com.elpracticante.backend.degree.api;

import com.elpracticante.backend.degree.dto.CreateDegreeRequest;
import com.elpracticante.backend.degree.dto.CreateDegreeResponse;
import com.elpracticante.backend.degree.dto.GetDegreesResponse;

public interface DegreeServiceAPI {


    GetDegreesResponse getDegrees();

    CreateDegreeResponse addScool(CreateDegreeRequest createDegreeRequest);
}
