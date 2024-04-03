package com.elpracticante.backend.shared.dto.errors;

public class MobileExistsException extends RuntimeException {
    private final Integer code;

    public MobileExistsException(String message, Integer code) {
        super(message);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }
}
