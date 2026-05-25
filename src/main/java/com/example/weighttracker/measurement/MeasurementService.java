package com.example.weighttracker.measurement;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeasurementService {
    @Autowired
    private MeasurementRepository measurementRepository;

    public List<Measurement> getMeasurementsByUserId(UUID userId) {
        return measurementRepository.findByUserId(userId);
    }

    public Measurement addMeasurement(Measurement measurement) {
        return measurementRepository.save(measurement);
    }

    public void deleteMeasurement(Long id) {
        measurementRepository.deleteById(id);
    }
}
