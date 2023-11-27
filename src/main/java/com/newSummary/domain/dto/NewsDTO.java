package com.newSummary.domain.dto;




import lombok.Data;

@Data
public class NewsDTO {
	
	private String id;
	private String title;
	private String reporter;
	private String articleWriteTime;
	private String picture;
	private String articleContent;
	private String press;
	private String url;
	private String category;
	private Long viewCount;

}
