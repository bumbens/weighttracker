package com.example.weighttracker.user;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {
    
    @Autowired
    private UserRepository userRepository;

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

    public User updateUser(UUID id, User updatedUser){
        User user = userRepository.findById(id).orElseThrow(() -> new NoUserException(id));
        user.setName(updatedUser.getName());
        user.setAge(updatedUser.getAge());
        user.setHeight(updatedUser.getHeight());
        user.setStartDate(updatedUser.getStartDate());
        user.setStartWeight(updatedUser.getStartWeight());
        user.setCurrentWeight(updatedUser.getCurrentWeight());
        user.setTargetWeight(updatedUser.getTargetWeight());
        return userRepository.save(user);
    }
}
