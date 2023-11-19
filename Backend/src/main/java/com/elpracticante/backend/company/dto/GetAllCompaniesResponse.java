package com.elpracticante.backend.company.dto;

import com.elpracticante.backend.company.Company;

import java.util.List;

public record GetAllCompaniesResponse(

        List<Company> companyList
) {
}
