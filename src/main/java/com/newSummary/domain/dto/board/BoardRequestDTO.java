package com.newSummary.domain.dto.board;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.newSummary.domain.entity.Board;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BoardRequestDTO {
	
	
	// 게시글 내용
	private String bdContent;
	// 게시글 url
	private String bdUrl;
	// 유저 이메일
	private String userEmail;



}
