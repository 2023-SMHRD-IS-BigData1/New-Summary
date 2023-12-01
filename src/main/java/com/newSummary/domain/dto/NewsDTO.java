package com.newSummary.domain.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy. MM. dd. HH:mm");
	    return LocalDateTime.parse(articleWriteTime, formatter);
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

}
