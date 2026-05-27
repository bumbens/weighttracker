package com.example.weighttracker.userMeasurementPreference;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/preferences")
public class UserMeasurementPreferencesController {
    
    @Autowired
    private UserMeasurementPreferenceService userMeasurementPreferenceService;

    @GetMapping("/{userId}")
    public List<UserMeasurementPreference> getUserPreferences(@PathVariable UUID userId){
        return userMeasurementPreferenceService.getPreferencesByUserId(userId);
    }

    @PostMapping
    public List<UserMeasurementPreference> savePreferences(@RequestBody List<UserMeasurementPreference> userMeasurementPreferences) {
        return userMeasurementPreferenceService.savePreferences(userMeasurementPreferences);
    }

    @PutMapping("/{userId}")
    public List<UserMeasurementPreference> updatePreferences(@PathVariable UUID userId, @RequestBody List<UserMeasurementPreference> userMeasurementPreferences) {
        userMeasurementPreferenceService.updatePreferences(userId, userMeasurementPreferences);
        return userMeasurementPreferenceService.getPreferencesByUserId(userId);
    }
}
