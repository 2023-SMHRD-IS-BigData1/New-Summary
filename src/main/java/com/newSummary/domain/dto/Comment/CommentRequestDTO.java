package com.newSummary.domain.dto.Comment;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDTO {

	// 댓글 내용
	private String cmtContent;
	// 게시글 번호
	private Long bdIdx;
	// 유저 메일
	private String userEmail;


}
