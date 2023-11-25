package com.elpracticante.backend.company;

import com.elpracticante.backend.company.api.CompanyServiceAPI;
import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.dto.GetCompanyResponse;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.intership.Intership;
import com.elpracticante.backend.intership.entity.IntershipEntity;
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
                            companyEntity.getInterships().size())
                    );
                }
            }
            case "reviews" -> {
                companyEntityList = companyRepository.findAll(Sort.by(Sort.Direction.DESC, "interships"));
                for (CompanyEntity companyEntity : companyEntityList) {
                    companyList.add(new Company(
                            companyEntity.getId(),
                            companyEntity.getName(),
                            companyEntity.getRating(),
                            companyEntity.getCity(),
                            companyEntity.getAutonomousCommunity(),
                            companyEntity.getInterships().size())
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
                            companyEntity.getInterships().size())
                    );
                }
            }
            case "reviewsDesc" -> {
                companyEntityList = companyRepository.findAll(Sort.by(Sort.Direction.ASC, "interships"));
                for (CompanyEntity companyEntity : companyEntityList) {
                    companyList.add(new Company(
                            companyEntity.getId(),
                            companyEntity.getName(),
                            companyEntity.getRating(),
                            companyEntity.getCity(),
                            companyEntity.getAutonomousCommunity(),
                            companyEntity.getInterships().size())
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
                            companyEntity.getInterships().size())
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
                mapToIntership(companyEntity.get().getInterships()),
                companyEntity.get().getRating()
        );

        return getCompanyResponse;
    }

    private List<Intership> mapToIntership(List<IntershipEntity> interships) {
        List<Intership> intershipList = new ArrayList<>();

        interships.forEach(intershipEntity -> intershipList.add(
                new Intership(
                        intershipEntity.getId(),
                        intershipEntity.getDescription(),
                        intershipEntity.getStartDate(),
                        intershipEntity.getEndDate(),
                        intershipEntity.getRating(),
                        intershipEntity.getDegreeName(),
                        intershipEntity.getSchoolName(),
                        new Company(intershipEntity.getCompany().getName(), intershipEntity.getCompany().getRating()),
                        mapToStudent(intershipEntity.getStudent()),
                        mapToTechonologiesList(intershipEntity.getTechnologies()),
                        mapToSummaryList(intershipEntity.getSummaries())
                )
        ));

        return intershipList;
    }
}


