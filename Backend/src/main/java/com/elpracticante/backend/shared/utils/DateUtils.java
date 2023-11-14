package com.elpracticante.backend.shared.utils;

import java.time.LocalDate;

public final class DateUtils {
    private DateUtils(){}

    public static LocalDate getFormattedLocalDate(String createStudentRequest) {
        return LocalDate.parse(createStudentRequest);
    }
}
