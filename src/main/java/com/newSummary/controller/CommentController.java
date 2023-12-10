package com.newSummary.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newSummary.domain.dto.Comment.CommentRequestDTO;
import com.newSummary.domain.dto.Comment.CommentResponseDTO;
import com.newSummary.domain.dto.Comment.CommentSuccessDTO;
import com.newSummary.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {

	@Autowired
	private final CommentService commentService;

	// 게시글에 작성된 댓글 가져오기
	@GetMapping("/list/{bdIdx}")
	public List<CommentResponseDTO> commentList(@PathVariable("bdIdx") Long bdIdx) {
		return commentService.commentList(bdIdx);
	}

	// 댓글 입력
	@PostMapping("/create")
	public CommentResponseDTO createComment(@RequestBody CommentRequestDTO commentRequestDTO) {
		return commentService.createComment(commentRequestDTO);
	}

	// 댓글 수정
	@PutMapping("/update/{cmtIdx}")
	public CommentResponseDTO updateComment(@PathVariable Long cmtIdx, @RequestBody CommentRequestDTO commentRequestDTO)
			throws Exception {
		return commentService.updateComment(cmtIdx, commentRequestDTO);
	}

	// 댓글 삭제
	@DeleteMapping("/delete/{cmtIdx}")
	public CommentSuccessDTO deleteComment(@PathVariable Long cmtIdx,
			@RequestBody CommentRequestDTO commentRequestDTO)
			throws Exception {
		return commentService.deleteComment(cmtIdx, commentRequestDTO);
	}

}
