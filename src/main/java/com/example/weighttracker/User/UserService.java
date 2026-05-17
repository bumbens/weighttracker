package com.example.weighttracker.user;

import java.util.UUID;

public interface UserService {
    User createUser(User user);

    User getUser(UUID id);
}
