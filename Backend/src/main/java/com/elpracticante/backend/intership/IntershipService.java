package com.elpracticante.backend.intership;

import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.intership.api.IntershipServiceAPI;
import com.elpracticante.backend.intership.dto.CreateIntershipRequest;
import com.elpracticante.backend.intership.dto.CreateIntershipResponse;
import com.elpracticante.backend.intership.dto.SummarizeType;
import com.elpracticante.backend.intership.entity.IntershipEntity;
import com.elpracticante.backend.intership.entity.SummarizeEntity;
import com.elpracticante.backend.intership.entity.TechnologyEntity;
import com.elpracticante.backend.intership.repository.IntershipRepository;
import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;
import com.elpracticante.backend.shared.utils.EntityHelperUtils;
import com.elpracticante.backend.student.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.elpracticante.backend.shared.utils.DateUtils.getFormattedLocalDate;

@Service
public class IntershipService implements IntershipServiceAPI {

    private final IntershipRepository intershipRepository;

    private final StudentRepository studentRepository;

    private final CompanyRepository companyRepository;

    public IntershipService(IntershipRepository intershipRepository, StudentRepository studentRepository, CompanyRepository companyRepository) {
        this.intershipRepository = intershipRepository;
        this.studentRepository = studentRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public CreateIntershipResponse addStudent(CreateIntershipRequest createIntershipRequest) throws EmptyInputFieldException {

        Integer intershipCreatedId = createIntership(createIntershipRequest);
        return new CreateIntershipResponse(intershipCreatedId);
    }

    private Integer createIntership(CreateIntershipRequest createIntershipRequest) {
        IntershipEntity intershipEntity = new IntershipEntity();
        intershipEntity.setDescription(createIntershipRequest.description());
        intershipEntity.setStartDate(getFormattedLocalDate(createIntershipRequest.startDate()));
        intershipEntity.setEndDate(getFormattedLocalDate(createIntershipRequest.endDate()));
        intershipEntity.setRating(createIntershipRequest.rating());
        intershipEntity.setDegreeName(createIntershipRequest.degreeName());
        intershipEntity.setSchoolName(createIntershipRequest.schoolName());
        intershipEntity.setStudent(EntityHelperUtils.getStudentEntityById(createIntershipRequest.studentId(), studentRepository));
        intershipEntity.setCompany(EntityHelperUtils.getCompanyEntity(createIntershipRequest.companyId(), companyRepository));
        intershipEntity.setTechnologies(getTechnologiesList(createIntershipRequest.technologies()));
        intershipEntity.setSummaries(getSumarriesBest(createIntershipRequest.summaryBest(), createIntershipRequest.summaryWorst()));

        Integer intershipId = intershipRepository.save(intershipEntity).getId();
        return intershipId;
    }

    private List<SummarizeEntity> getSumarriesBest(List<String> bestList, List<String> worstList) {
        List<SummarizeEntity> summarizeEntityList = new ArrayList<>();

        for(String best: bestList) {
            SummarizeEntity summarizeEntity = new SummarizeEntity();
            summarizeEntity.setName(best);
            summarizeEntity.setType(SummarizeType.BEST);
        }

        for(String worst: worstList) {
            SummarizeEntity summarizeEntity = new SummarizeEntity();
            summarizeEntity.setName(worst);
            summarizeEntity.setType(SummarizeType.WORST);
        }

        return summarizeEntityList;
    }

    private List<TechnologyEntity> getTechnologiesList(List<String> technologies) {
        List<TechnologyEntity> technologyEntityList = new ArrayList<>();

        for(String technology: technologies) {
           TechnologyEntity technologyEntity = new TechnologyEntity();
            technologyEntity.setName(technology);
            technologyEntityList.add(technologyEntity);
        }

        return technologyEntityList;
    }
}
