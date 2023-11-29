package com.elpracticante.backend.company;


import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.dto.GetCompanyResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/companies")
@CrossOrigin
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }


    @GetMapping(consumes =  MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GetAllCompaniesResponse> getAllCompanies(@RequestParam("sortBy") String sortBy) {
        GetAllCompaniesResponse getAllCompaniesResponse = companyService.getAllCompanies(sortBy);
        return new ResponseEntity<>(getAllCompaniesResponse, HttpStatus.OK);
    }

    @GetMapping(path = {"/{companyId}"}, consumes =  MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GetCompanyResponse> getCompany(@PathVariable int companyId) throws EntityNotFoundException {
        GetCompanyResponse getCompanyResponse = companyService.getCompany(companyId);
        return new ResponseEntity<>(getCompanyResponse, HttpStatus.OK);
    }

}
