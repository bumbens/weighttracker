package com.example.weighttracker.auth;

import lombok.Data;

@Data
public class LoginRequest {
    private String mail;
    private String password;
}
