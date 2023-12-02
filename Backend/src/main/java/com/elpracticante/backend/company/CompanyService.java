package com.elpracticante.backend.company;

import com.elpracticante.backend.company.api.CompanyServiceAPI;
import com.elpracticante.backend.company.dto.CreateCompanyRequest;
import com.elpracticante.backend.company.dto.CreateCompoanyResponse;
import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.dto.GetCompanyResponse;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.Degree;
import com.elpracticante.backend.internship.Internship;
import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.school.School;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.elpracticante.backend.shared.utils.EntityHelperUtils.*;

@Service
public class CompanyService implements CompanyServiceAPI {

    private static final Logger logger = LoggerFactory.getLogger(CompanyService.class);

    private final CompanyRepository companyRepository;


    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public GetAllCompaniesResponse getAllCompanies(String sortBy) {

        List<CompanyEntity> companyEntityList;
        List<Company> companyList = new ArrayList<>();
        switch (sortBy) {
            case "alphabetically" -> {
                companyEntityList = companyRepository.findAll();
                for (CompanyEntity companyEntity : companyEntityList) {
                    companyList.add(new Company(
                            companyEntity.getId(),
                            companyEntity.getName(),
                            companyEntity.getRating(),
                            companyEntity.getCity(),
                            companyEntity.getAutonomousCommunity(),
                            companyEntity.getInternships().size())
                    );
                }
            }
            case "reviews" -> {
                companyEntityList = companyRepository.findAll(Sort.by(Sort.Direction.DESC, "internships"));
                for (CompanyEntity companyEntity : companyEntityList) {
                    companyList.add(new Company(
                            companyEntity.getId(),
                            companyEntity.getName(),
                            companyEntity.getRating(),
                            companyEntity.getCity(),
                            companyEntity.getAutonomousCommunity(),
                            companyEntity.getInternships().size())
                    );
                }
            }
            case "scoring" -> {
                companyEntityList = companyRepository.findAll(Sort.by(Sort.Direction.DESC, "rating"));
                for (CompanyEntity companyEntity : companyEntityList) {
                    companyList.add(new Company(
                            companyEntity.getId(),
                            companyEntity.getName(),
                            companyEntity.getRating(),
                            companyEntity.getCity(),
                            companyEntity.getAutonomousCommunity(),
                            companyEntity.getInternships().size())
                    );
                }
            }
            case "reviewsDesc" -> {
                companyEntityList = companyRepository.findAll(Sort.by(Sort.Direction.ASC, "internships"));
                for (CompanyEntity companyEntity : companyEntityList) {
                    companyList.add(new Company(
                            companyEntity.getId(),
                            companyEntity.getName(),
                            companyEntity.getRating(),
                            companyEntity.getCity(),
                            companyEntity.getAutonomousCommunity(),
                            companyEntity.getInternships().size())
                    );
                }
            }
            case "scoringDesc" -> {
                companyEntityList = companyRepository.findAll(Sort.by(Sort.Direction.ASC, "rating"));
                for (CompanyEntity companyEntity : companyEntityList) {
                    companyList.add(new Company(
                            companyEntity.getId(),
                            companyEntity.getName(),
                            companyEntity.getRating(),
                            companyEntity.getCity(),
                            companyEntity.getAutonomousCommunity(),
                            companyEntity.getInternships().size())
                    );
                }
            }
        }


        return new GetAllCompaniesResponse(companyList);
    }

    @Override
    public GetCompanyResponse getCompany(int companyId) {
        Optional<CompanyEntity> companyEntity = companyRepository.findById(companyId);

        if (companyEntity.isEmpty()) {
            throw new EntityNotFoundException("La empresa con ID: " + companyId + " no existe.");
        }


        GetCompanyResponse getCompanyResponse = new GetCompanyResponse(
                companyEntity.get().getName(),
                companyEntity.get().getEmail(),
                companyEntity.get().getEmployeesAmount(),
                companyEntity.get().getAutonomousCommunity(),
                companyEntity.get().getCity(),
                companyEntity.get().getAboutUs(),
                companyEntity.get().getWhyUs(),
                mapToIntership(companyEntity.get().getInternships()),
                companyEntity.get().getRating()
        );

        return getCompanyResponse;
    }

    @Override
    public CreateCompoanyResponse addCompany(CreateCompanyRequest createCompanyRequest) {

        // Verificar que no exista la empresa
        Optional<CompanyEntity> companyEntityOptional = companyRepository.findByNif(createCompanyRequest.nif());
        if (companyEntityOptional.isPresent()) {
            throw new EntityExistsException("The Company with CIF " + createCompanyRequest.nif() + " already exists in the database");
        }

        CompanyEntity companyEntity = new CompanyEntity();
        companyEntity.setName(createCompanyRequest.name());
        companyEntity.setEmail(createCompanyRequest.email());
        companyEntity.setNif(createCompanyRequest.nif());
        companyEntity.setEmployeesAmount(createCompanyRequest.empoyeesAmount());
        companyEntity.setAutonomousCommunity(createCompanyRequest.autonomousCommunity());
        companyEntity.setZipcode(createCompanyRequest.zipcode());
        companyEntity.setCity(createCompanyRequest.city());
        companyEntity.setAboutUs(createCompanyRequest.aboutUs());
        companyEntity.setWhyUs(createCompanyRequest.whyUs());
        companyEntity.setRating(createCompanyRequest.rating());
        companyEntity.setInternships(new ArrayList<>());

        CompanyEntity companyEntitySaved = companyRepository.save(companyEntity);

        return new CreateCompoanyResponse(companyEntitySaved.getId());
    }

    private List<Internship> mapToIntership(List<InternshipEntity> interships) {
        List<Internship> internshipList = new ArrayList<>();

        interships.forEach(internshipEntity -> internshipList.add(
                new Internship(
                        internshipEntity.getId(),
                        internshipEntity.getDescription(),
                        internshipEntity.getStartDate(),
                        internshipEntity.getEndDate(),
                        internshipEntity.getRating(),
                        new Degree(internshipEntity.getDegree().getId(), internshipEntity.getDegree().getName()),
                        new School(internshipEntity.getSchool().getId(), internshipEntity.getSchool().getName()),
                        new Company(internshipEntity.getCompany().getName(), internshipEntity.getCompany().getRating()),
                        mapToStudent(internshipEntity.getStudent()),
                        mapToTechonologiesList(internshipEntity.getTechnologies()),
                        mapToSummaryList(internshipEntity.getSummaries())
                )
        ));

        return internshipList;
    }
}


