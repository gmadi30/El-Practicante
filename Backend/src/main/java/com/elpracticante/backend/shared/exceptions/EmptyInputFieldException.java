package com.elpracticante.backend.shared.exceptions;

import org.springframework.http.HttpStatus;

public class EmptyInputFieldException  extends RuntimeException  {

    HttpStatus httpStatus;

    public EmptyInputFieldException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}


