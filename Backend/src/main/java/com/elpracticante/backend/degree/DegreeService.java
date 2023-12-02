package com.elpracticante.backend.degree;

import com.elpracticante.backend.degree.api.DegreeServiceAPI;
import com.elpracticante.backend.degree.dto.CreateDegreeRequest;
import com.elpracticante.backend.degree.dto.CreateDegreeResponse;
import com.elpracticante.backend.degree.dto.GetDegreesResponse;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DegreeService implements DegreeServiceAPI {

    private final DegreeRepository degreeRepository;

    public DegreeService(DegreeRepository degreeRepository) {
        this.degreeRepository = degreeRepository;
    }

    @Override
    public GetDegreesResponse getDegrees() {
        List<DegreeEntity> degreeEntityList = degreeRepository.findAll();

        if (null == degreeEntityList && degreeEntityList.isEmpty()){
            throw new EntityNotFoundException("No degree was found at the DEGREE table");
        }
        
        return new GetDegreesResponse(mapToDegreeList(degreeEntityList));
    }

    @Override
    public CreateDegreeResponse addScool(CreateDegreeRequest createDegreeRequest) {
        Optional<DegreeEntity> optionalDegreeEntity = degreeRepository.findByName(createDegreeRequest.name());

        if (optionalDegreeEntity.isPresent()) {
            throw new EntityExistsException("The Degree with name " + createDegreeRequest.name() + " already exists in the database");

        }

        DegreeEntity degreeEntity = new DegreeEntity();
        degreeEntity.setName(createDegreeRequest.name());
        degreeEntity.setInternships(new ArrayList<>());

        DegreeEntity degreeEntitySaved = degreeRepository.save(degreeEntity);

        return new CreateDegreeResponse(degreeEntitySaved.getId());
    }

    private List<Degree> mapToDegreeList(List<DegreeEntity> degreeEntityList) {
        List<Degree> degreeList = new ArrayList<>();

        degreeEntityList.forEach((
                degreeEntity -> degreeList.add(
                        new Degree(
                                degreeEntity.getId(),
                                degreeEntity.getName()
                        )
                )
        ));

        return degreeList;
    }
}
