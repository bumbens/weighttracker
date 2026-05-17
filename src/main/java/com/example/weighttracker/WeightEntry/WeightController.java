package com.example.weighttracker.weightEntry;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weightentry")
public class WeightController {

    @Autowired
    private WeightService weightService;

    @GetMapping
    public List<WeightEntry> getAllEntries() {
        return weightService.getAllEntries();
    }

    @GetMapping("/user/{userId}")
    public List<WeightEntry> getEntriesByUserId(@PathVariable UUID userId) {
        return weightService.getEntriesByUserId(userId);
    }

    @PostMapping("/create")
    public WeightEntry addWeightEntry(@RequestBody WeightEntry weightEntry) {
        return weightService.addEntry(weightEntry);
    }

    @PutMapping("/update/{id}")
    public WeightEntry updateWeightEntry(@PathVariable UUID id, @RequestBody WeightEntry updatedWeightEntry) {
        return weightService.updateEntry(id, updatedWeightEntry);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteWeightEntry(@PathVariable UUID id) {
        weightService.removeEntry(id);
    }
}
