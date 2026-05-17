package com.example.weighttracker.weightEntry;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.weighttracker.user.UserServiceImpl;

@Service
public class WeightService {
    @Autowired
    private WeightRepository weightRepository;
    @Autowired
    private UserServiceImpl userService;

    public List<WeightEntry> getAllEntries() {
        return weightRepository.findAll();
    }

    public List<WeightEntry> getEntriesByUserId(UUID id){
        return weightRepository.findByUserId(id);
    }

    public WeightEntry addEntry(WeightEntry weightEntry) {
        WeightEntry savedEntry = weightRepository.save(weightEntry);
        userService.updateWeight(weightEntry.getUser().getId(), weightEntry.getWeight());
        return savedEntry;
    }

    public void removeEntry(UUID id) {
        WeightEntry entry = weightRepository.findById(id).orElseThrow();
        UUID userId = entry.getUser().getId();

        weightRepository.deleteById(id);

        List<WeightEntry> remainingEntries = weightRepository.findByUserIdOrderByDateAsc(userId);
        if (remainingEntries.isEmpty()) {
            userService.updateWeight(userId, 0);
        } else {
            WeightEntry latestEntry = remainingEntries.get(remainingEntries.size() - 1);
            userService.updateWeight(userId, latestEntry.getWeight());
        }
    }

    public WeightEntry updateEntry(UUID id, WeightEntry updatedWeightEntry) {
        WeightEntry weightEntry = weightRepository.findById(id).orElseThrow();
        weightEntry.setDate(updatedWeightEntry.getDate());
        weightEntry.setWeight(updatedWeightEntry.getWeight());
        weightEntry.setWaist(updatedWeightEntry.getWaist());
        weightEntry.setChest(updatedWeightEntry.getChest());
        return weightRepository.save(weightEntry);
    }
}
