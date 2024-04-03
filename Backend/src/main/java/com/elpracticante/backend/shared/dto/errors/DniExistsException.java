package com.elpracticante.backend.shared.dto.errors;

public class DniExistsException extends RuntimeException {
    private final Integer code;

    public DniExistsException(String message, Integer code) {
        super(message);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }
}
