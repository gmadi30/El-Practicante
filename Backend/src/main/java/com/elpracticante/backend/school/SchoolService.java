package com.elpracticante.backend.school;

import com.elpracticante.backend.school.api.SchoolServiceAPI;
import com.elpracticante.backend.school.dto.GetSchoolsResponse;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.school.repository.SchoolRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SchoolService implements SchoolServiceAPI {

    private final SchoolRepository schoolRepository;

    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    @Override
    public GetSchoolsResponse getSchools() {
        List<SchoolEntity> schoolEntityList = schoolRepository.findAll();

        if (null == schoolEntityList && schoolEntityList.isEmpty()){
            throw new EntityNotFoundException("No school was found at the SCHOOL table");
        }

        return new GetSchoolsResponse(mapToSchoolList(schoolEntityList));
    }

    private List<School> mapToSchoolList(List<SchoolEntity> schoolEntityList) {
        List<School> schoolList = new ArrayList<>();

        schoolEntityList.forEach((
                schoolEntity -> schoolList.add(
                        new School(
                                schoolEntity.getId(),
                                schoolEntity.getName()
                        )
                )
        ));

        return schoolList;
    }
}
