package com.newSummary.domain.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;

import lombok.Data;

@Data
public class NewsDTO {

	// 뉴스번호
	private String id;
	// 뉴스 타이틀
	private String title;
	// 기자
	private String reporter;
	// 작성시간
	private String articleWriteTime;
	
	public LocalDateTime getArticleWriteTimeAsDateTime() {
	    DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy. MM. dd. HH:mm");
	    DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy. MM. d. HH:mm");

	    try {
	        return LocalDateTime.parse(articleWriteTime, formatter1);
	    } catch (DateTimeParseException e1) {
	        try {
	            return LocalDateTime.parse(articleWriteTime, formatter2);
	        } catch (DateTimeParseException e2) {
	            // 예외 처리, 로깅 또는 더 구체적인 예외 던지기
	            e2.printStackTrace(); // 또는 throw new IllegalArgumentException("Invalid date/time format", e2);
	            return null; // 또는 다른 기본 값
	        }
	    }
	}
	// 사진 url
	private String picture;
	// 기사내용
	private String articleContent;
	// 언론사
	private String press;
	// 기사url
	private String url;
	// 카테고리
	private String category;
	// 조회수
	private Long viewCount;
	// 요약본
	private String summary;
	// 키워드
	private String keyword;
	

}
