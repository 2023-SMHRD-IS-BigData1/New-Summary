package com.newSummary.domain.entity;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "keywords")
@Getter
@NoArgsConstructor
public class Keyword {
	
	@Id
	private String id;
	
	@Field("keywords")
	private KeywordsData keywordsData;
	
	@Field("created_at")
	private String keywordWriteTime;
	
    @Getter
    @NoArgsConstructor
    public class KeywordsData {
    	private Map<String, Integer> keywords;
    }
}
