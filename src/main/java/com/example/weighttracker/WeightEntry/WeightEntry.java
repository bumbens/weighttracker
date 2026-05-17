package com.example.weighttracker.weightEntry;

import java.time.LocalDate;
import java.util.UUID;

import com.example.weighttracker.shared.converter.DoubleCryptoConverter;
import com.example.weighttracker.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "weight_entries")
public class WeightEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    @Convert(converter = DoubleCryptoConverter.class)
    private Double weight;

    @Column(nullable = false)
    @Convert(converter = DoubleCryptoConverter.class)
    private Double waist;

    @Column(nullable = false)
    @Convert(converter = DoubleCryptoConverter.class)
    private Double chest;

}
