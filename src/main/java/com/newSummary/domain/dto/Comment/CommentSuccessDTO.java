package com.newSummary.domain.dto.Comment;

import lombok.Getter;

@Getter
public class CommentSuccessDTO {

	private boolean success;

	public CommentSuccessDTO(boolean success) {
		this.success = success;

	}

}
