package com.elpracticante.backend.company;

import com.elpracticante.backend.company.api.CompanyServiceAPI;
import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.student.StudentController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService implements CompanyServiceAPI {

    private static final Logger logger = LoggerFactory.getLogger(CompanyService.class);

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public GetAllCompaniesResponse getAllCompanies() {

        List<CompanyEntity> companyEntityList = companyRepository.findAll();
        List<Company> companyList = new ArrayList<>();
        companyEntityList.stream().forEach((companyEntity) -> {
            companyList.add( new Company(
                    companyEntity.getId(),
                    companyEntity.getName(),
                    companyEntity.getRating(),
                    companyEntity.getCity(),
                    companyEntity.getAutonomousCommunity(),
                    companyEntity.getInterships().size()
            ));
        });

        return new GetAllCompaniesResponse(companyList);
    }
}
