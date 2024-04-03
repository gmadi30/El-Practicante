package com.elpracticante.backend.shared.dto.errors;

public class EmailExistsException extends RuntimeException {

    private final Integer code;
    public EmailExistsException(String message, Integer code) {
        super(message);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }
}
