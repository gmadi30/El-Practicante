package com.elpracticante.backend.internship;

import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.internship.api.InternshipServiceAPI;
import com.elpracticante.backend.internship.dto.*;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.internship.entity.SummarizeEntity;
import com.elpracticante.backend.internship.entity.TechnologyEntity;
import com.elpracticante.backend.internship.repository.InternshipRepository;
import com.elpracticante.backend.internship.repository.TechnologyRepository;
import com.elpracticante.backend.school.School;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.utils.EntityHelperUtils;
import com.elpracticante.backend.shared.utils.Utils;
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
    public CreateInternshipResponse addIntership(CreateInternshipRequest createInternshipRequest) {
        // Retrieve a company
        CompanyEntity companyEntity = EntityHelperUtils.getCompanyEntity(createInternshipRequest.companyId(), companyRepository);
        // Create the Intership entity
        InternshipEntity internshipEntity = createIntership(createInternshipRequest,companyEntity);
        // Save the Intership entity
        Integer intershipId = internshipRepository.save(internshipEntity).getId();

        Utils.updateRatingCompanyEntity(companyEntity, internshipRepository);
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
                internshipEntity.getTitle(),
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

        return new GetInternshipResponse(internship);
    }

    @Override
    public GetTechnologies getTechnologies() {
        List<TechnologyEntity> technologyEntityList = technologyRepository.findAll();
        return new GetTechnologies(mapToTechonologiesList(technologyEntityList));
    }

    @Override
    public void deleteTechnology(Integer intershipId, Integer technologyId) {
            //internshipRepository.deleteTechnologyFromInternship(intershipId, technologyId);
    }

    private InternshipEntity createIntership(CreateInternshipRequest createInternshipRequest, CompanyEntity companyEntity) {
        InternshipEntity internshipEntity = new InternshipEntity();
        internshipEntity.setTitle(createInternshipRequest.title());
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

    private List<TechnologyEntity> getTechnologiesList(List<Integer> technologies) {
        List<TechnologyEntity> technologyEntityList = new ArrayList<>();

        for(Integer technology: technologies) {
           if (null != technology) {
               Optional<TechnologyEntity> technologyEntity = technologyRepository.findById(technology);
               technologyEntity.ifPresent(technologyEntityList::add);
           }
        }

        return technologyEntityList;
    }
}
