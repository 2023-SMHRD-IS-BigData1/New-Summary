package com.newSummary.domain.dto.bookmark;

import lombok.Getter;

@Getter
public class BookmarkSuccessDTO {
	private boolean success;
	
	public BookmarkSuccessDTO(boolean success) {
		this.success = success;
		
	}

}
