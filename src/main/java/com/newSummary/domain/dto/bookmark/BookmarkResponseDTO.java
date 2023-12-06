package com.newSummary.domain.dto.bookmark;

import com.newSummary.domain.entity.Bookmark;

import lombok.Data;

@Data
public class BookmarkResponseDTO {
	
	private Long bookmark_idx;
	private String newsObjectId;
	private String userEmail;

	public BookmarkResponseDTO(Bookmark bookmark,String userEmail) {
		this.bookmark_idx = bookmark.getBookmarkIdx();
		this.newsObjectId = bookmark.getNewsObjectId();
		this.userEmail = userEmail;
	}
}
