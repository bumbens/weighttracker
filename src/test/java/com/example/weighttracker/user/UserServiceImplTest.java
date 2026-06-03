package com.example.weighttracker.user;

import com.example.weighttracker.measurement.Measurement;
import com.example.weighttracker.measurement.MeasurementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private MeasurementRepository measurementRepository;

    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @Test
    void updateUser_noMeasurements_resetsCurrentWeightToNewStartWeight() {
        UUID id = UUID.randomUUID();
        User existing = new User();
        existing.setId(id);
        existing.setStartWeight(70.0);
        existing.setCurrentWeight(65.0);

        User update = new User();
        update.setStartWeight(72.0);

        when(userRepository.findById(id)).thenReturn(Optional.of(existing));
        when(measurementRepository.findByUserId(id)).thenReturn(List.of());
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        User result = userServiceImpl.updateUser(id, update);

        assertThat(result.getCurrentWeight()).isEqualTo(72.0);
    }

    @Test
    void updateUser_hasMeasurements_doesNotResetCurrentWeight() {
        UUID id = UUID.randomUUID();
        User existing = new User();
        existing.setId(id);
        existing.setStartWeight(70.0);
        existing.setCurrentWeight(75.0);

        User update = new User();
        update.setStartWeight(72.0);

        when(userRepository.findById(id)).thenReturn(Optional.of(existing));
        when(measurementRepository.findByUserId(id)).thenReturn(List.of(new Measurement()));
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        User result = userServiceImpl.updateUser(id, update);

        assertThat(result.getCurrentWeight()).isEqualTo(75.0);
    }
}
