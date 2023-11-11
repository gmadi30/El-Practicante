package com.elpracticante.backend.shared.exceptions;

import org.springframework.http.HttpStatus;

public class WrongLoginCredentialsException extends RuntimeException  {

    HttpStatus httpStatus;

    public WrongLoginCredentialsException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
