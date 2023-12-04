package com.newSummary.domain.dto.bookmark;

import com.newSummary.domain.entity.User;

import lombok.Data;

@Data
public class BookmarkRequestDTO {
	
	private String newsObjectId;
	private User user;
	
}
