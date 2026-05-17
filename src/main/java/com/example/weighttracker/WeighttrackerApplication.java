package com.example.weighttracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WeighttrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeighttrackerApplication.class, args);
	}

}
