package com.example.weighttracker.measurement;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.weighttracker.user.UserServiceImpl;

@Service
public class MeasurementService {
    @Autowired
    private MeasurementRepository measurementRepository;

    @Autowired
    private UserServiceImpl userService;

    public List<Measurement> getMeasurementsByUserId(UUID userId) {
        return measurementRepository.findByUserId(userId);
    }

    public Measurement addMeasurement(Measurement measurement) {

        Measurement savedMeasurement = measurementRepository.save(measurement);

        if(savedMeasurement.getMeasurementType().getId() == 1L) {
            userService.updateWeight(savedMeasurement.getUser().getId(), savedMeasurement.getValue());
        }
            

        return savedMeasurement;
    }

    public void deleteMeasurement(Long id) {
        Measurement measurement = measurementRepository.findById(id).orElse(null);
        measurementRepository.deleteById(id);

        if(measurement != null && measurement.getMeasurementType().getId() == 1L) {
            UUID userId = measurement.getUser().getId();
            List<Measurement> remaining = measurementRepository.findByUserIdAndMeasurementTypeId(userId, 1L);
            if (!remaining.isEmpty()) {
                Measurement latest = remaining.get(remaining.size() - 1);
                userService.updateWeight(userId, latest.getValue());
            } else {
                userService.updateWeight(userId, userService.getUser(userId).getStartWeight()); // or some default value
            }
        }
    }
}
