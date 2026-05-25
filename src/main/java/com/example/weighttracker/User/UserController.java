package com.example.weighttracker.user;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {
        String mail = authentication.getName();
        return userRepository.findByMail(mail).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable UUID id){
        userService.deleteUser(id);
    }

    // This method is not used in the current implementation, but it can be useful for testing or future features
    @PostMapping("/create")
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PatchMapping("/{id}/preferences-configured")
    public User setPreferencesConfigured(@PathVariable UUID id){
        return userService.setPreferencesConfigured(id);
    }

    @PatchMapping("update/{id}/weight")
    public User updateWeight(@PathVariable UUID id, @RequestBody double weight) {
        return userService.updateWeight(id, weight);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable UUID id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }
}
