package com.example.weighttracker.shared.converter;

import org.springframework.core.env.Environment;

import jakarta.persistence.Converter;

@Converter
public class DoubleCryptoConverter extends CryptoConverter<Double> {

    public DoubleCryptoConverter(Environment environment) {
        super(environment);
    }

    @Override
    public String convertToDatabaseColumn(Double attribute) {
        if (attribute == null)
            return null;
        return encrypt(String.valueOf(attribute));
    }

    @Override
    public Double convertToEntityAttribute(String dbData) {
        if (dbData == null)
            return null;
        return Double.parseDouble(decrypt(dbData));
    }

}
