package com.example.weighttracker.measurement;

import com.example.weighttracker.measurementType.MeasurementType;
import com.example.weighttracker.user.User;
import com.example.weighttracker.user.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MeasurementServiceTest {

    @Mock
    private MeasurementRepository measurementRepository;

    @Mock
    private UserServiceImpl userService;

    @InjectMocks
    private MeasurementService measurementService;

    private User makeUser() {
        User u = new User();
        u.setId(UUID.randomUUID());
        u.setStartWeight(70.0);
        u.setCurrentWeight(70.0);
        return u;
    }

    private MeasurementType weightType() {
        MeasurementType mt = new MeasurementType();
        mt.setId(1L);
        mt.setName("Weight");
        mt.setUnit("kg");
        return mt;
    }

    private MeasurementType otherType() {
        MeasurementType mt = new MeasurementType();
        mt.setId(2L);
        mt.setName("Body Fat");
        mt.setUnit("%");
        return mt;
    }

    private Measurement makeMeasurement(User user, MeasurementType type, double value) {
        Measurement m = new Measurement();
        m.setId(1L);
        m.setUser(user);
        m.setMeasurementType(type);
        m.setValue(value);
        return m;
    }

    @Test
    void addWeightMeasurement_updatesCurrentWeight() {
        User user = makeUser();
        Measurement m = makeMeasurement(user, weightType(), 80.0);
        when(measurementRepository.save(m)).thenReturn(m);

        measurementService.addMeasurement(m);

        verify(userService).updateWeight(user.getId(), 80.0);
    }

    @Test
    void addNonWeightMeasurement_doesNotUpdateCurrentWeight() {
        User user = makeUser();
        Measurement m = makeMeasurement(user, otherType(), 20.0);
        when(measurementRepository.save(m)).thenReturn(m);

        measurementService.addMeasurement(m);

        verifyNoInteractions(userService);
    }

    @Test
    void deleteWeightMeasurement_restoresPreviousWeight() {
        User user = makeUser();
        Measurement deleted = makeMeasurement(user, weightType(), 82.0);
        Measurement previous = makeMeasurement(user, weightType(), 78.0);

        when(measurementRepository.findById(1L)).thenReturn(Optional.of(deleted));
        when(measurementRepository.findByUserIdAndMeasurementTypeId(user.getId(), 1L))
                .thenReturn(List.of(previous));

        measurementService.deleteMeasurement(1L);

        verify(userService).updateWeight(user.getId(), 78.0);
    }

    @Test
    void deleteOnlyWeightMeasurement_resetsToStartWeight() {
        User user = makeUser();
        Measurement deleted = makeMeasurement(user, weightType(), 82.0);

        when(measurementRepository.findById(1L)).thenReturn(Optional.of(deleted));
        when(measurementRepository.findByUserIdAndMeasurementTypeId(user.getId(), 1L))
                .thenReturn(List.of());
        when(userService.getUser(user.getId())).thenReturn(user);

        measurementService.deleteMeasurement(1L);

        verify(userService).updateWeight(user.getId(), 70.0);
    }

    @Test
    void deleteNonWeightMeasurement_doesNotUpdateCurrentWeight() {
        User user = makeUser();
        Measurement deleted = makeMeasurement(user, otherType(), 20.0);

        when(measurementRepository.findById(1L)).thenReturn(Optional.of(deleted));

        measurementService.deleteMeasurement(1L);

        verifyNoInteractions(userService);
    }
}
