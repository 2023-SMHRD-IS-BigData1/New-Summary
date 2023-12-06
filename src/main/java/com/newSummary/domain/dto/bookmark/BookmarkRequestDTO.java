package com.newSummary.domain.dto.bookmark;


import lombok.Data;

@Data
public class BookmarkRequestDTO {
	
	private String newsObjectId;
	private String userEmail;
	
    // 생성자 추가
    public BookmarkRequestDTO(String newsObjectId, String userEmail) {
        this.newsObjectId = newsObjectId;
        this.userEmail = userEmail;
    }
	
}
