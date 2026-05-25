package com.example.weighttracker.measurementType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeasurementTypeService {
    @Autowired
    private MeasurementTypeRepository measurementTypeRepository;

    public List<MeasurementType> getAllMeasurementTypes(){
        return measurementTypeRepository.findAll();
    }
}
