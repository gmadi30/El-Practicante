package com.elpracticante.backend.company;

import com.elpracticante.backend.company.api.CompanyServiceAPI;
import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
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
        }



        return new GetAllCompaniesResponse(companyList);
    }
}
