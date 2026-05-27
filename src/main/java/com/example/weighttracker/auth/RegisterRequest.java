package com.example.weighttracker.auth;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String mail;
    private String password;
    private Integer age;
    private Integer height;
    private Double startWeight;
    private Double targetWeight;
    private Boolean preferences_configured;
}
