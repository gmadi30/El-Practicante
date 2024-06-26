package com.elpracticante.backend.company.api;

import com.elpracticante.backend.company.dto.CreateCompanyRequest;
import com.elpracticante.backend.company.dto.CreateCompanyResponse;
import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.dto.GetCompanyResponse;
import com.elpracticante.backend.student.dto.CompanySortBy;


public interface CompanyServiceAPI {

    GetAllCompaniesResponse getAllCompanies(CompanySortBy sortBy);

    GetCompanyResponse getCompany(int companyId);

    CreateCompanyResponse addCompany(CreateCompanyRequest createCompanyRequest);
}
