package com.example.weighttracker.user;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoUserException extends RuntimeException{
    public NoUserException(UUID id){
        super("No user found with id: " + id);
    }
}
