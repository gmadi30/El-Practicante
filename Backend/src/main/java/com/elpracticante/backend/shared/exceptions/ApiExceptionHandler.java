package com.elpracticante.backend.shared.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.FileNotFoundException;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler({ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException exception, HttpStatus httpStatus) {
        ApiException apiException = new ApiException(exception.getMessage(), httpStatus, ZonedDateTime.now(ZoneId.of("Z")));
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler({EmptyInputFieldException.class})
    public ResponseEntity<Object> emptyInputFieldException(EmptyInputFieldException exception) {
        ApiException apiException = new ApiException(exception.getMessage(), exception.httpStatus, ZonedDateTime.now(ZoneId.of("Z")));
        return new ResponseEntity<>(apiException, exception.httpStatus);
    }

    @ExceptionHandler({WrongLoginCredentialsException.class})
    public ResponseEntity<Object> wrongLoginCredentialsException(WrongLoginCredentialsException exception) {
        ApiException apiException = new ApiException(exception.getMessage(), exception.httpStatus, ZonedDateTime.now(ZoneId.of("Z")));
        return new ResponseEntity<>(apiException, exception.httpStatus);
    }
}
