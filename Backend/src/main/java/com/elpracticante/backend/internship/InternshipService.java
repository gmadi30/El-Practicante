package com.elpracticante.backend.internship;

import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.internship.api.InternshipServiceAPI;
import com.elpracticante.backend.internship.dto.CreateInternshipRequest;
import com.elpracticante.backend.internship.dto.CreateInternshipResponse;
import com.elpracticante.backend.internship.dto.GetInternshipResponse;
import com.elpracticante.backend.internship.dto.SummarizeType;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.internship.entity.SummarizeEntity;
import com.elpracticante.backend.internship.entity.TechnologyEntity;
import com.elpracticante.backend.internship.repository.InternshipRepository;
import com.elpracticante.backend.internship.repository.TechnologyRepository;
import com.elpracticante.backend.school.School;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;
import com.elpracticante.backend.shared.utils.EntityHelperUtils;
import com.elpracticante.backend.student.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.elpracticante.backend.shared.utils.DateUtils.getFormattedLocalDate;
import static com.elpracticante.backend.shared.utils.EntityHelperUtils.*;

@Service
public class InternshipService implements InternshipServiceAPI {

    private static final Logger logger = LoggerFactory.getLogger(InternshipService.class);

    private final InternshipRepository internshipRepository;

    private final StudentRepository studentRepository;

    private final CompanyRepository companyRepository;

    private final TechnologyRepository technologyRepository;

    private final SchoolRepository schoolRepository;


    private final DegreeRepository degreeRepository;

    public InternshipService(InternshipRepository internshipRepository, StudentRepository studentRepository, CompanyRepository companyRepository, TechnologyRepository technologyRepository, SchoolRepository schoolRepository, DegreeRepository degreeRepository) {
        this.internshipRepository = internshipRepository;
        this.studentRepository = studentRepository;
        this.companyRepository = companyRepository;
        this.technologyRepository = technologyRepository;
        this.schoolRepository = schoolRepository;
        this.degreeRepository = degreeRepository;
    }

    @Override
    public CreateInternshipResponse addIntership(CreateInternshipRequest createInternshipRequest) throws EmptyInputFieldException {

        // Retrieve a company
        CompanyEntity companyEntity = EntityHelperUtils.getCompanyEntity(createInternshipRequest.companyId(), companyRepository);
        // Create the Intership entity
        InternshipEntity internshipEntity = createIntership(createInternshipRequest,companyEntity);
        // Save the Intership entity
        Integer intershipId = internshipRepository.save(internshipEntity).getId();

        updateRatingCompanyEntity(companyEntity);
        Double companyRating = companyRepository.save(companyEntity).getRating();
        CreateInternshipResponse createInternshipResponse = new CreateInternshipResponse(intershipId);


        logger.debug("Company with ID: {}, updated. RatingOverallValue: {} - ReviewsAmount: {}", companyEntity.getId(), companyRating, companyEntity.getInternships().size());
        return createInternshipResponse;
    }

    @Override
    public GetInternshipResponse getIntership(Integer intershipId) {

        InternshipEntity internshipEntity = getIntershipEntity(intershipId, internshipRepository);

        Internship internship = new Internship(
                internshipEntity.getId(),
                internshipEntity.getDescription(),
                internshipEntity.getStartDate(),
                internshipEntity.getEndDate(),
                internshipEntity.getRating(),
                new Degree(internshipEntity.getDegree().getId(), internshipEntity.getDegree().getName()),
                new School(internshipEntity.getSchool().getId(), internshipEntity.getSchool().getName()),
                mapToCompany(internshipEntity.getCompany()),
                mapToStudent(internshipEntity.getStudent()),
                mapToTechonologiesList(internshipEntity.getTechnologies()),
                mapToSummaryList(internshipEntity.getSummaries())
                );

        GetInternshipResponse getInternshipResponse = new GetInternshipResponse(internship);
        return getInternshipResponse;
    }



    private void updateRatingCompanyEntity(CompanyEntity companyEntity) {
       Double average = internshipRepository.calculateRatingAverageByCompanyId(companyEntity.getId());
       companyEntity.setRating(average);
    }

    private InternshipEntity createIntership(CreateInternshipRequest createInternshipRequest, CompanyEntity companyEntity) {
        InternshipEntity internshipEntity = new InternshipEntity();
        internshipEntity.setDescription(createInternshipRequest.description());
        internshipEntity.setStartDate(getFormattedLocalDate(createInternshipRequest.startDate()));
        internshipEntity.setEndDate(getFormattedLocalDate(createInternshipRequest.endDate()));
        internshipEntity.setRating(createInternshipRequest.rating());
        internshipEntity.setDegree(EntityHelperUtils.getDegreeEntity(createInternshipRequest.degreeId(), degreeRepository));
        internshipEntity.setSchool(EntityHelperUtils.getSchoolEntity(createInternshipRequest.schoolId(), schoolRepository));
        internshipEntity.setStudent(EntityHelperUtils.getStudentEntityById(createInternshipRequest.studentId(), studentRepository));
        internshipEntity.setCompany(companyEntity);
        internshipEntity.setTechnologies(getTechnologiesList(createInternshipRequest.technologies()));
        internshipEntity.setSummaries(getSumarriesBest(createInternshipRequest.summaryBest(), createInternshipRequest.summaryWorst()));
        return internshipEntity;
    }

    private List<SummarizeEntity> getSumarriesBest(List<String> bestList, List<String> worstList) {
        List<SummarizeEntity> summarizeEntityList = new ArrayList<>();

        for(String best: bestList) {
            SummarizeEntity summarizeEntity = new SummarizeEntity();
            summarizeEntity.setName(best);
            summarizeEntity.setType(SummarizeType.BEST);
            summarizeEntityList.add(summarizeEntity);
        }

        for(String worst: worstList) {
            SummarizeEntity summarizeEntity = new SummarizeEntity();
            summarizeEntity.setName(worst);
            summarizeEntity.setType(SummarizeType.WORST);
            summarizeEntityList.add(summarizeEntity);
        }

        return summarizeEntityList;
    }

    private List<TechnologyEntity> getTechnologiesList(List<String> technologies) {
        List<TechnologyEntity> technologyEntityList = new ArrayList<>();

        for(String technology: technologies) {
            Optional<TechnologyEntity> technologyEntity = technologyRepository.findByName(technology);

            technologyEntity.ifPresent(technologyEntityList::add);
        }

        return technologyEntityList;
    }
}
