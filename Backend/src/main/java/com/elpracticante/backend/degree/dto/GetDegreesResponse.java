package com.elpracticante.backend.degree.dto;

import com.elpracticante.backend.degree.Degree;

import java.util.List;

public record GetDegreesResponse(List<Degree> degrees) {
}
