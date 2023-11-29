package com.newSummary.domain.dto;

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

}
