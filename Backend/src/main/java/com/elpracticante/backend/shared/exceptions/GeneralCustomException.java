package com.elpracticante.backend.shared.exceptions;

import org.springframework.http.HttpStatus;

public class GeneralCustomException extends Exception  {

    HttpStatus httpStatus;

    public GeneralCustomException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause);
        this.httpStatus = httpStatus;
    }
}


