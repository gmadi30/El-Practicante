package com.elpracticante.backend.company.api;

import com.elpracticante.backend.company.dto.GetAllCompaniesResponse;
import com.elpracticante.backend.company.dto.GetCompanyResponse;


public interface CompanyServiceAPI {

    GetAllCompaniesResponse getAllCompanies(String sortBy);

    GetCompanyResponse getCompany(int companyId);
}
