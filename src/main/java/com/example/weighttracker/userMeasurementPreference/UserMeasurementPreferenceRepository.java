package com.example.weighttracker.userMeasurementPreference;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserMeasurementPreferenceRepository extends JpaRepository<UserMeasurementPreference, Long> {

    List<UserMeasurementPreference> findByUserId(UUID userId);
    
}
