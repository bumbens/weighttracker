package com.example.weighttracker.user;

import java.time.LocalDate;
import java.util.UUID;

import com.example.weighttracker.shared.converter.DoubleCryptoConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private Integer height;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Convert(converter = DoubleCryptoConverter.class)
    private Double startWeight;

    @Column(nullable = false)
    @Convert(converter = DoubleCryptoConverter.class)
    private Double currentWeight;

    @Column(nullable = false)
    @Convert(converter = DoubleCryptoConverter.class)
    private Double targetWeight;

    @Column(nullable = false)
    private LocalDate startDate;
}
