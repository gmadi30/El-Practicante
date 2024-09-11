package com.elpracticante.backend.internship;

import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.degree.repository.DegreeRepository;
import com.elpracticante.backend.internship.api.InternshipServiceAPI;
import com.elpracticante.backend.internship.dto.*;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.internship.entity.TechnologyEntity;
import com.elpracticante.backend.internship.repository.InternshipRepository;
import com.elpracticante.backend.internship.repository.TechnologyRepository;
import com.elpracticante.backend.school.School;
import com.elpracticante.backend.school.repository.SchoolRepository;
import com.elpracticante.backend.shared.utils.DateUtils;
import com.elpracticante.backend.shared.utils.EntityHelperUtils;
import com.elpracticante.backend.shared.utils.Utils;
import com.elpracticante.backend.student.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        InternshipEntity internshipEntity = EntityHelperUtils.createInternship(createInternshipRequest,companyEntity, degreeRepository, schoolRepository, studentRepository);
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
                mapToSummaryList(internshipEntity.getSummaries()),
                internshipEntity.getSubmittedDate(),
                internshipEntity.getIsAnonymous()
                );

        return new GetInternshipResponse(internship);
    }

    @Override
    public Technologies getTechnologies() {
        List<TechnologyEntity> technologyEntityList = technologyRepository.findAll();
        return new Technologies(mapToTechonologiesList(technologyEntityList));
    }

    @Override
    public void deleteTechnology(Integer intershipId, Integer technologyId) {
            //internshipRepository.deleteTechnologyFromInternship(intershipId, technologyId);
    }

    @Override
    public void updateInternship(UpdateInternshipRequest updateInternshipRequest, Integer internshipId) {
        Optional<InternshipEntity> internshipEntityOptional = internshipRepository.findById(internshipId);


        if (internshipEntityOptional.isPresent()) {
            InternshipEntity internshipEntity = internshipEntityOptional.get();

            if (updateInternshipRequest.schoolId() != internshipEntity.getSchool().getId()) {
                internshipEntity.setSchool(EntityHelperUtils.getSchoolEntity(updateInternshipRequest.schoolId(), schoolRepository));
            }

            if (updateInternshipRequest.companyId() != internshipEntity.getCompany().getId()) {
                internshipEntity.setCompany(EntityHelperUtils.getCompanyEntity(updateInternshipRequest.companyId(), companyRepository));
            }

            if (updateInternshipRequest.degreeId() != internshipEntity.getDegree().getId()) {
                internshipEntity.setDegree(EntityHelperUtils.getDegreeEntity(updateInternshipRequest.degreeId(), degreeRepository));
            }

            if (!updateInternshipRequest.startDate().equals(internshipEntity.getStartDate().toString())) {
                internshipEntity.setStartDate(DateUtils.getFormattedLocalDate(updateInternshipRequest.startDate()));
            }

            if (!updateInternshipRequest.endDate().equals(internshipEntity.getEndDate().toString())) {
                internshipEntity.setEndDate(DateUtils.getFormattedLocalDate(updateInternshipRequest.endDate()));
            }

            if (!updateInternshipRequest.description().equals(internshipEntity.getDescription())) {
                internshipEntity.setDescription(updateInternshipRequest.description());
            }

            if (updateInternshipRequest.rating() != internshipEntity.getRating()) {
                internshipEntity.setRating(updateInternshipRequest.rating());
            }

            internshipEntity.setTechnologies(getTechnologiesList(updateInternshipRequest.selectedTechnologies()));
            internshipEntity.setSummaries(getSummaries(updateInternshipRequest.summaryBest(), updateInternshipRequest.summaryWorst()));


            internshipRepository.save(internshipEntity);
        }
    }

    @Override
    public List<Technology> getTechnologiesByInternship(Integer internshipId) {
        InternshipEntity internshipEntity = EntityHelperUtils.getIntershipEntity(internshipId, internshipRepository);
        return mapToTechonologiesList(internshipEntity.getTechnologies());
    }




}
