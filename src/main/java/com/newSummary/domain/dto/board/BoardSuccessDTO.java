package com.newSummary.domain.dto.board;

import lombok.Getter;

@Getter
public class BoardSuccessDTO {
	private boolean success;
	
	public BoardSuccessDTO(boolean success) {
		this.success = success;
		
	}

}
