package com.newSummary.domain.dto.Comment;

import java.time.LocalDateTime;

import com.newSummary.domain.entity.Comment;

import lombok.Data;

@Data
public class CommentResponseDTO {
	
	// 댓글 번호
	private Long cmtIdx;
	// 댓글 내용
	private String cmtContent;
	// 작성 시간
	private LocalDateTime createdAt;
	// 댓글 좋아요
	private int cmtLikes;
	// 댓글 단 게시글 번호
	private Long bdIdx;
	// 댓글 작성자 닉네임
	private String userName;

	public CommentResponseDTO(Comment comment, Long bdIdx, String userName) {
		this.cmtIdx = comment.getCmtIdx();
		this.cmtContent = comment.getCmtContent();
		this.createdAt = comment.getCreatedAt();
		this.cmtLikes = comment.getCmtLikes();
		this.bdIdx = bdIdx;
		this.userName = userName;

	}

}
