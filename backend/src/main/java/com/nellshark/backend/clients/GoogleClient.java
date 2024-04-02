package com.nellshark.backend.clients;

import com.nellshark.backend.models.responses.RecaptchaResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.service.annotation.PostExchange;

@Component
public interface GoogleClient {

  @PostExchange("/recaptcha/api/siteverify")
  RecaptchaResponse verifyRecaptcha();
}