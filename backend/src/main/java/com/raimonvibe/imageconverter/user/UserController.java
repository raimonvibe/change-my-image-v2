package com.raimonvibe.imageconverter.user;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
  private final UserRepository userRepository;

  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/me")
  public Map<String, Object> me(Principal principal) {
    if (principal == null) return Map.of("authenticated", false);
    var user = userRepository.findByEmail(principal.getName()).orElseThrow();
    boolean reset = !LocalDate.now().equals(user.getLastFreeReset());
    int freeRemaining = (reset ? 20 : Math.max(0, 20 - user.getFreeUsedToday()));
    return Map.of(
        "authenticated", true,
        "email", user.getEmail(),
        "freeRemaining", freeRemaining,
        "paidCredits", user.getPaidCredits()
    );
  }
}
