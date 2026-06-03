package com.example.weighttracker.auth;

import com.example.weighttracker.shared.config.JwtUtil;
import com.example.weighttracker.user.User;
import com.example.weighttracker.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthController authController;

    private RegisterRequest makeRequest() {
        RegisterRequest r = new RegisterRequest();
        r.setName("Test User");
        r.setAge(25);
        r.setHeight(175);
        r.setMail("test@example.com");
        r.setPassword("password123");
        r.setStartWeight(80.0);
        r.setTargetWeight(70.0);
        return r;
    }

    @Test
    void register_setsPreferencesConfiguredFalse() {
        when(passwordEncoder.encode(anyString())).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        authController.register(makeRequest());

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getPreferencesConfigured()).isFalse();
    }

    @Test
    void register_setsCurrentWeightEqualToStartWeight() {
        when(passwordEncoder.encode(anyString())).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        authController.register(makeRequest());

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getCurrentWeight())
                .isEqualTo(captor.getValue().getStartWeight());
    }
}
