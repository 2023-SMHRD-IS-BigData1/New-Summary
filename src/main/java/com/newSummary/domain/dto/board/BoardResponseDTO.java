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
	private String userName;
		

	public BoardResponseDTO(Board board, String userName) {
		this.bdIdx = board.getBdIdx();
		this.bdContent = board.getBdContent();
		this.bdUrl = board.getBdUrl();
		this.createdAt = board.getCreatedAt();
		this.bdLikes = board.getBdLikes();
		this.bdViews = board.getBdViews();
		this.userName = userName;

	}

}
