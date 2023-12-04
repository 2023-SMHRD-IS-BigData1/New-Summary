package com.newSummary.domain.entity;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

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
	private Map<String, Integer> keywordsData;
	
	@Field("created_at")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private String keywordWriteTime;
	
}
