package com.newSummary.domain.dto.board;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.newSummary.domain.entity.Board;
import com.newSummary.domain.entity.User;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BoardRequestDTO {
	
	private Long bdIdx;
	private String bdContent;
	private String bdUrl;
	private LocalDateTime createdAt;
	private String userEmail;		
	
	public Board fill(Board board) {
		board.setBdContent(this.bdContent);
		board.setBdUrl(this.bdUrl);
		board.getBdIdx();
		return board;
		
	}

}
