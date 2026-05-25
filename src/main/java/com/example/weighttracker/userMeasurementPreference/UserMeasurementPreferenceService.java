package com.example.weighttracker.userMeasurementPreference;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void updatePreferences(List<UserMeasurementPreference> preferences) {
        getPreferencesByUserId(preferences.get(0).getUser().getId()).forEach(pref -> userMeasurementPreferenceRepository.delete(pref));
        userMeasurementPreferenceRepository.saveAll(preferences);
    }
}
