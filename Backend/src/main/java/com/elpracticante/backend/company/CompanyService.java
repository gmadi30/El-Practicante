package com.elpracticante.backend.company;

import com.elpracticante.backend.company.api.CompanyServiceAPI;
import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.dto.GetCompanyResponse;
import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.company.repository.CompanyRepository;
import com.elpracticante.backend.degree.dto.DegreeDTO;
import com.elpracticante.backend.intership.Intership;
import com.elpracticante.backend.intership.dto.Summarize;
import com.elpracticante.backend.intership.dto.Technology;
import com.elpracticante.backend.intership.entity.IntershipEntity;
import com.elpracticante.backend.intership.entity.SummarizeEntity;
import com.elpracticante.backend.intership.entity.TechnologyEntity;
import com.elpracticante.backend.school.dto.SchoolDTO;
import com.elpracticante.backend.student.Student;
import com.elpracticante.backend.student.entity.StudentEntity;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
                        mapToSummaries(intershipEntity.getSummaries())
                )
        ));

        return intershipList;
    }

    private List<Summarize> mapToSummaries(List<SummarizeEntity> summaries) {
        List<Summarize> summarizeList = new ArrayList<>();

        summaries.forEach((summarizeEntity) -> summarizeList.add(new Summarize(
                summarizeEntity.getName(),
                summarizeEntity.getType()
        )));

        return summarizeList;
    }

    private List<Technology> mapToTechonologiesList(List<TechnologyEntity> technologies) {
        List<Technology> technologyList = new ArrayList<>();

        technologies.forEach((technologyEntity) -> technologyList.add(new Technology(
                technologyEntity.getName()
        )));

        return technologyList;
    }

    private Student mapToStudent(StudentEntity studentEntity) {

        return new Student(
                studentEntity.getId(),
                studentEntity.getName(),
                studentEntity.getLastName(),
                studentEntity.getCity(),
                studentEntity.getAutonomousCommunity(),
                studentEntity.getMobile(),
                null,
                studentEntity.getCompanyName(),
                new SchoolDTO(
                        studentEntity.getSchool().getId(),
                        studentEntity.getSchool().getName()),
                new DegreeDTO(
                        studentEntity.getDegree().getId(),
                        studentEntity.getDegree().getName())
        );
    }
}
