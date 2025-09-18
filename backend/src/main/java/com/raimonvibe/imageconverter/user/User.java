package com.raimonvibe.imageconverter.user;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Table(name = "app_user")
@Data
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String email;

  private Integer freeUsedToday = 0;
  private LocalDate lastFreeReset = LocalDate.now();

  private Integer paidCredits = 0;
}
