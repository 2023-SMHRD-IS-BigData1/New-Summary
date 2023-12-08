package com.newSummary.domain.dto.point;

import lombok.Data;

@Data
public class PointRequestDTO {
	
	// 유저 이메일
	private String userEmail;

	// 뉴스 클릭한 경우
	private int newsClick;
	
	// 게시글 작성한 경우
	private int boardWrite;
	
	// 댓글 작성한 경우
	private int commentWrite;

}
