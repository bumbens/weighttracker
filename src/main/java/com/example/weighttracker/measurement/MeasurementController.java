package com.example.weighttracker.measurement;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/measurements")
public class MeasurementController {
    
    @Autowired
    private MeasurementService measurementService;

    @GetMapping("/{userId}")
    public List<Measurement> getUserMeasurements(@PathVariable UUID userId) {
        return measurementService.getMeasurementsByUserId(userId);
    }

    @PostMapping
    public Measurement addMeasurement(@RequestBody Measurement measurement){
        measurementService.addMeasurement(measurement);
        return measurement;
    }

    @DeleteMapping("delete/{id}")
    public void deleteMeasurement(@PathVariable Long id) {
        measurementService.deleteMeasurement(id);
    }
}
