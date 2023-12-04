package com.newSummary.domain.dto.bookmark;

import com.newSummary.domain.entity.Bookmark;

import lombok.Data;

@Data
public class BookmarkResponseDTO {
	
	private Long boomark_idx;
	private String user_email;
	private String news_object_id;

	public BookmarkResponseDTO(Bookmark bookmark) {
		this.boomark_idx = bookmark.getBookmarkIdx();
		this.news_object_id = bookmark.getNewsObjectId();
	}
}
