package com.example.weighttracker.measurementType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class MeasurementTypeController {
    @Autowired
    private MeasurementTypeService measurementTypeService;

    @GetMapping("/measurement-types")
    public List<MeasurementType> getAllMeasurementTypes(){
        return measurementTypeService.getAllMeasurementTypes();
    }
}
