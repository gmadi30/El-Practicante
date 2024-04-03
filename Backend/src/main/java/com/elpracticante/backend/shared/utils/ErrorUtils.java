package com.elpracticante.backend.shared.utils;

import com.elpracticante.backend.shared.dto.ErrorResponse;
import com.elpracticante.backend.shared.dto.errors.DniExistsException;
import com.elpracticante.backend.shared.dto.errors.EmailExistsException;
import com.elpracticante.backend.shared.dto.errors.MobileExistsException;
import jakarta.persistence.EntityExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorUtils {

    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<ErrorResponse> handleEntityExistsException(EntityExistsException ex) {
        return handleException(ex, HttpStatus.CONFLICT, 000);
    }

    @ExceptionHandler(DniExistsException.class)
    public ResponseEntity<ErrorResponse> handleDniExistsException(DniExistsException ex) {
            return handleException(ex, HttpStatus.CONFLICT, ex.getCode());
    }

    @ExceptionHandler(EmailExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailExistsException(EmailExistsException ex) {
        return handleException(ex, HttpStatus.CONFLICT, ex.getCode());
    }

    @ExceptionHandler(MobileExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailExistsException(MobileExistsException ex) {
        return handleException(ex, HttpStatus.CONFLICT, ex.getCode());
    }

    public ResponseEntity<ErrorResponse> handleException(Exception ex, HttpStatus status, Integer code) {
        ErrorResponse response = new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage(), code);
        return ResponseEntity.status(status).body(response);
    }


}
