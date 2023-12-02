package com.elpracticante.backend.school.api;

import com.elpracticante.backend.school.dto.CreateSchoolRequest;
import com.elpracticante.backend.school.dto.CreateSchoolResponse;
import com.elpracticante.backend.school.dto.GetSchoolsResponse;

public interface SchoolServiceAPI {


    GetSchoolsResponse getSchools();

    CreateSchoolResponse addScool(CreateSchoolRequest createSchoolRequest);
}
