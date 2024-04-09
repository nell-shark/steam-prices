package com.nellshark.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegistrationDTO(
    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email is not valid")
    String email,

    @NotBlank(message = "Password must not be blank")
    @Size(min = 8, max = 32, message = "Password should be between 8 and 32 characters in length")
    String password) {

}
