package com.newSummary.domain.dto.board;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.newSummary.domain.entity.Board;

import lombok.Data;

@Data
public class BoardResponseDTO {
	
	private Long bdIdx;
	private String bdContent;
	private String bdUrl;
	private LocalDateTime createdAt;
	private int bdViews;
	private int bdLikes;
	private User user;
	
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class User {
		private String userEmail;
	}
	
	public BoardResponseDTO(Board entity) {
		this.bdIdx = entity.getBdIdx();
		this.bdContent = entity.getBdContent();
		this.bdUrl = entity.getBdUrl();
		this.createdAt = entity.getCreatedAt();
		this.bdLikes = entity.getBdLikes();
		this.bdViews = entity.getBdViews();
		
	}
	


}
