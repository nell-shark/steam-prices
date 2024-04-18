package com.nellshark.backend.controllers;

import com.nellshark.backend.dtos.AppDTO;
import com.nellshark.backend.dtos.FavoriteAppRequestDTO;
import com.nellshark.backend.dtos.UserRegistrationDTO;
import com.nellshark.backend.services.UserService;
import com.nellshark.backend.utils.Api;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Api.User.BASE_URL)
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Long registerUser(
      @Valid @RequestBody UserRegistrationDTO user,
      @Valid @NotBlank @RequestParam("captcha") String clientCaptchaToken) {
    return userService.registerUser(user, clientCaptchaToken);
  }

  @GetMapping("/{id}/apps")
  @PreAuthorize("#id == authentication.principal.id OR hasRole('ADMIN')")
  public List<AppDTO> getFavoriteAppsByUserId(@PathVariable("id") long id) {
    return userService.getFavoriteAppsByUserId(id);
  }

  @PostMapping("/{id}/apps")
  @PreAuthorize("isAuthenticated()")
  @ResponseStatus(HttpStatus.CREATED)
  public void addFavoriteAppToUser(
      @PathVariable("id") long userId,
      @RequestBody FavoriteAppRequestDTO favoriteAppRequestDTO) {
    userService.addFavoriteAppToUser(userId, favoriteAppRequestDTO.appId());
  }
}
