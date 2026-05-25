package com.example.weighttracker.measurement;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
    List<Measurement> findByUserId(UUID user_id);
}
