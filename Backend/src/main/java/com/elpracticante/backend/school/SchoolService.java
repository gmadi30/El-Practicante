package com.elpracticante.backend.school;

import com.elpracticante.backend.school.api.SchoolServiceAPI;
import com.elpracticante.backend.school.dto.CreateSchoolRequest;
import com.elpracticante.backend.school.dto.CreateSchoolResponse;
import com.elpracticante.backend.school.dto.GetSchoolsResponse;
import com.elpracticante.backend.school.entity.SchoolEntity;
import com.elpracticante.backend.school.repository.SchoolRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public CreateSchoolResponse addScool(CreateSchoolRequest createSchoolRequest) {

        Optional<SchoolEntity> schoolEntityOptional = schoolRepository.findByName(createSchoolRequest.name());
        if (schoolEntityOptional.isPresent()) {
            throw new EntityExistsException("The School with name " + createSchoolRequest.name() + " already exists in the database");
        }

        SchoolEntity schoolEntity = new SchoolEntity();
        schoolEntity.setName(createSchoolRequest.name());
        schoolEntity.setEmail(createSchoolRequest.email());
        schoolEntity.setCity(createSchoolRequest.city());
        schoolEntity.setAutonomousCommunity(createSchoolRequest.autonomousCommunity());
        schoolEntity.setZipcode(createSchoolRequest.zipCode());
        schoolEntity.setFullAddress(createSchoolRequest.fullAddress());
        schoolEntity.setInternships(new ArrayList<>());

        SchoolEntity schoolEntitySaved = schoolRepository.save(schoolEntity);
        return new CreateSchoolResponse(schoolEntitySaved.getId());
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
