package com.elpracticante.backend.shared.dto;

public record ErrorResponse(Integer status, String message, Object errorResponseCode) {
}
