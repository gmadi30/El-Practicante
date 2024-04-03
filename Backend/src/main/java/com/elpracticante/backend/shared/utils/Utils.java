package com.elpracticante.backend.shared.utils;

import com.elpracticante.backend.company.entity.CompanyEntity;
import com.elpracticante.backend.internship.repository.InternshipRepository;

public final class Utils {

    private Utils() {
    }

    public static void updateRatingCompanyEntity(CompanyEntity companyEntity, InternshipRepository internshipRepository) {
        Double average = internshipRepository.calculateRatingAverageByCompanyId(companyEntity.getId());
        companyEntity.setRating(average);
    }
}
