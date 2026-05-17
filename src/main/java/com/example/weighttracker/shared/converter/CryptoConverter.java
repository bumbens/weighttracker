package com.example.weighttracker.shared.converter;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.core.env.Environment;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public abstract class CryptoConverter<T> implements AttributeConverter<T, String> {

    private static final String ENCRYPTION_PASSWORD_PROPERTY = "jasypt.encryptor.password";

    private final StandardPBEStringEncryptor encryptor;

    public CryptoConverter(Environment environment) {
        this.encryptor = new StandardPBEStringEncryptor();
        this.encryptor.setPassword(environment.getProperty(ENCRYPTION_PASSWORD_PROPERTY));
    }

    protected String encrypt(String value) {
        return encryptor.encrypt(value);
    }

    protected String decrypt(String value) {
        return encryptor.decrypt(value);
    }
}
