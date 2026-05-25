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

        if(savedMeasurement.getMeasurementType().getName().equalsIgnoreCase("weight")){
            userService.updateWeight(savedMeasurement.getUser().getId(), savedMeasurement.getValue());
        }
        return savedMeasurement;
    }

    public void deleteMeasurement(Long id) {
        measurementRepository.deleteById(id);
    }
}
