package com.nellshark.backend.exceptions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;


@Data
public class ApiError {
    private final String status;
    private final String message;
    private final String path;
    private final LocalDateTime timestamp;
    private final int code;
    @JsonIgnore
    private final HttpStatus httpStatus;

    public ApiError(HttpStatus status, String message, String path) {
        this.status = status.getReasonPhrase();
        this.message = message;
        this.path = path;
        this.timestamp = LocalDateTime.now();
        this.code = status.value();
        this.httpStatus = status;
    }
}