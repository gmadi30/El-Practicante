package com.elpracticante.backend.degree;

import com.elpracticante.backend.degree.api.DegreeServiceAPI;
import com.elpracticante.backend.degree.dto.GetDegreesResponse;
import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
