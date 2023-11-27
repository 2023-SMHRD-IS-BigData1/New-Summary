package com.newSummary.domain.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "news")
@Getter
@NoArgsConstructor
public class News {
	
	@Id
	private String id;
	
	@Field("제목")
	private String title;
	
	@Field("기자")
	private String reporter;
	
	@Field("기사작성시간")
	private String articleWriteTime;
	
	@Field("사진")
	private String picture;
	
	@Field("기사내용")
	private String articleContent;
	
	@Field("언론사")
	private String press;
	
	@Field("URL")
	private String url;
	
	@Field("카테고리")
	private String category;
	
	@Field("조회수")
	private Long viewCount;
}