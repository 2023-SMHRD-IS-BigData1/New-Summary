package com.newSummary.domain.dto.board;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.newSummary.domain.entity.Board;

import lombok.Data;

@Data
public class BoardResponseDTO {

	// 글번호
	private Long bdIdx;
	// 글내용
	private String bdContent;
	// 기사url
	private String bdUrl;
	// 작성시간
	private LocalDateTime createdAt;
	// 조회수
	private int bdViews;
	// 좋아요
	private int bdLikes;
	// 작성자
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
