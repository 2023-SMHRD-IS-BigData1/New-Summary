package com.newSummary.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.newSummary.domain.entity.Keyword;

public interface KeywordsRepository extends MongoRepository<Keyword, String> {
	
	// 
}
