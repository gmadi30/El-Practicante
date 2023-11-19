package com.elpracticante.backend.company;


import com.elpracticante.backend.company.api.CompanyServiceAPI;
import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/companies")
@CrossOrigin
public class CompanyController {

    private final CompanyServiceAPI companyServiceAP;

    public CompanyController(CompanyServiceAPI companyServiceAP) {
        this.companyServiceAP = companyServiceAP;
    }


    @GetMapping(consumes =  MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GetAllCompaniesResponse> getAllCompanies(@RequestParam("sortBy") String sortBy) {

        GetAllCompaniesResponse getAllCompaniesResponse = companyServiceAP.getAllCompanies(sortBy);
        return new ResponseEntity<>(getAllCompaniesResponse, HttpStatus.OK);
    }

}
