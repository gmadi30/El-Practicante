package com.elpracticante.backend.company;

import com.elpracticante.backend.company.api.CompanyServiceAPI;
import com.elpracticante.backend.company.dto.CreateCompanyRequest;
import com.elpracticante.backend.company.dto.CreateCompoanyResponse;
import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.dto.GetCompanyResponse;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.student.dto.CompanySortBy;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.elpracticante.backend.shared.utils.EntityHelperUtils.mapToCompany;
import static com.elpracticante.backend.shared.utils.EntityHelperUtils.mapToCompanyList;

@Service
public class CompanyService implements CompanyServiceAPI {

    private static final Logger logger = LoggerFactory.getLogger(CompanyService.class);

    private final CompanyRepository companyRepository;


    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public GetAllCompaniesResponse getAllCompanies(CompanySortBy sortBy) {

        List<CompanyEntity> companyEntityList;
        ArrayList<Company> companyList = new ArrayList<>();
        switch (sortBy) {
            case ALPHABETICALLY-> {
                companyEntityList = companyRepository.findAll(Sort.by("name"));
                mapToCompanyList(companyEntityList, companyList);
            }
            case REVIEWS -> {
                companyEntityList = companyRepository.findAllByOrderByInternshipsDesc();
                mapToCompanyList(companyEntityList, companyList);
            }
            case SCORING -> {
                companyEntityList = companyRepository.findAll(Sort.by(Sort.Direction.DESC, "rating"));
                mapToCompanyList(companyEntityList, companyList);
            }
            case REVIEWSDESC -> {
                companyEntityList = companyRepository.findAllByOrderByInternshipsAsc();
                mapToCompanyList(companyEntityList, companyList);
            }
            case SCORINGDESC -> {
                companyEntityList = companyRepository.findAll(Sort.by(Sort.Direction.ASC, "rating"));
                mapToCompanyList(companyEntityList, companyList);
            }
            default -> throw new IllegalStateException("Unexpected value: " + sortBy);
        }


        return new GetAllCompaniesResponse(companyList);
    }

    @Override
    public GetCompanyResponse getCompany(int companyId) {
    Optional<CompanyEntity> companyEntity = companyRepository.findById(companyId);

        if (companyEntity.isEmpty()) {
            throw new EntityNotFoundException("La empresa con ID: " + companyId + " no existe.");
        }

        return new GetCompanyResponse(mapToCompany(companyEntity.get()));
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
        companyEntity.setWebsite(createCompanyRequest.website());

        CompanyEntity companyEntitySaved = companyRepository.save(companyEntity);

        return new CreateCompoanyResponse(companyEntitySaved.getId());
    }
}


