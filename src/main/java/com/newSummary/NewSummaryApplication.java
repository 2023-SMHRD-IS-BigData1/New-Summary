package com.newSummary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class NewSummaryApplication {

	// hi
	public static void main(String[] args) {
		SpringApplication.run(NewSummaryApplication.class, args);
	}

}
