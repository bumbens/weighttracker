package com.example.weighttracker.userMeasurementPreference;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class UserMeasurementPreferenceService {
    
    @Autowired
    private UserMeasurementPreferenceRepository userMeasurementPreferenceRepository;

    public List<UserMeasurementPreference> getPreferencesByUserId(UUID userId) {
        return userMeasurementPreferenceRepository.findByUserId(userId);
    }

    public List<UserMeasurementPreference> savePreferences(List<UserMeasurementPreference> preferences) {
        return userMeasurementPreferenceRepository.saveAll(preferences);
    }

    @Transactional
    public void updatePreferences(UUID userId, List<UserMeasurementPreference> preferences) {
        userMeasurementPreferenceRepository.deleteByUserId(userId);
        userMeasurementPreferenceRepository.saveAll(preferences);
    }

}
