package com.example.weighttracker.shared.converter;

import org.springframework.core.env.Environment;

public class StringCryptoConverter extends CryptoConverter<String> {

    public StringCryptoConverter(Environment environment) {
        super(environment);
    }

    @Override
    public String convertToDatabaseColumn(String attribute) {
        if (attribute == null)
            return null;
        return encrypt(attribute);
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        if (dbData == null)
            return null;
        return decrypt(dbData);
    }

}
