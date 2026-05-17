package com.example.weighttracker.weightEntry;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WeightRepository extends JpaRepository<WeightEntry, UUID> {
    List<WeightEntry> findByUserId(UUID userId);
    List<WeightEntry> findByUserIdOrderByDateAsc(UUID userId);
}
