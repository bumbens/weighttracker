package com.example.weighttracker.user;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {
    
    @Autowired
    private UserRepository userRepository;

    // This method is not used in the current implementation, but it can be useful for testing or future features
    public User createUser(User user){
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUser(UUID id){
        return userRepository.findById(id).orElseThrow(() -> new NoUserException(id));
    }

    public void deleteUser(UUID id){
        userRepository.deleteById(id);
    }

    public User updateWeight(UUID id, double weight){
        User user = userRepository.findById(id).orElseThrow(() -> new NoUserException(id));
        user.setCurrentWeight(weight);
        return userRepository.save(user);
    }

    public User setPreferencesConfigured(UUID id){
        User user = userRepository.findById(id).orElseThrow(() -> new NoUserException(id));
        user.setPreferencesConfigured(true);
        return userRepository.save(user);
    }

    public User updateUser(UUID id, User updatedUser) {
    User user = userRepository.findById(id).orElseThrow(() -> new NoUserException(id));
    user.setName(updatedUser.getName() != null ? updatedUser.getName() : user.getName());
    user.setAge(updatedUser.getAge() != null ? updatedUser.getAge() : user.getAge());
    user.setHeight(updatedUser.getHeight() != null ? updatedUser.getHeight() : user.getHeight());
    user.setStartWeight(updatedUser.getStartWeight() != null ? updatedUser.getStartWeight() : user.getStartWeight());
    user.setTargetWeight(updatedUser.getTargetWeight() != null ? updatedUser.getTargetWeight() : user.getTargetWeight());
    user.setStartDate(updatedUser.getStartDate() != null ? updatedUser.getStartDate() : user.getStartDate());
    return userRepository.save(user);
}
}
