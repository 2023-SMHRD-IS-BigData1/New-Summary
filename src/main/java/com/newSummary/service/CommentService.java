package com.newSummary.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.Comment.CommentRequestDTO;
import com.newSummary.domain.dto.Comment.CommentResponseDTO;
import com.newSummary.domain.dto.Comment.CommentSuccessDTO;
import com.newSummary.domain.entity.Board;
import com.newSummary.domain.entity.Comment;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.BoardRepository;
import com.newSummary.repository.CommentRepository;
import com.newSummary.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {

	@Autowired
	private final CommentRepository commentRepository;
	private final BoardRepository boardRepository;
	private final UserRepository userRepository;

	// 게시글에 작성된 댓글 불러오기

	@Transactional
	public List<CommentResponseDTO> commentList(Long bdIdx) {
		// 게시글을 찾기
		Board board = boardRepository.findBybdIdx(bdIdx)
				.orElseThrow(() -> new EntityNotFoundException("게시글이 없습니다"));

		// 게시글에 해당하는 댓글들을 찾아서 CommentResponseDTO로 변환
		List<CommentResponseDTO> commentResponseDTOList = commentRepository.findAllByBoardOrderByCreatedAtDesc(board)
				.stream()
				.map(comment -> new CommentResponseDTO(comment, bdIdx, comment.getUser().getUserName()))
				.collect(Collectors.toList());

		return commentResponseDTOList;

	}

	// 댓글 작성
	@Transactional
	public CommentResponseDTO createComment(CommentRequestDTO commentRequestDTO) {

		Board board = boardRepository.findBybdIdx(commentRequestDTO.getBdIdx())
				.orElseThrow(() -> new EntityNotFoundException("게시글이 없습니다."));
		User user = userRepository.findByUserEmail(commentRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));
		Comment comment = Comment.builder()
				.cmtContent(commentRequestDTO.getCmtContent())
				.board(board)
				.user(user)
				.build();
		commentRepository.save(comment);
		return new CommentResponseDTO(comment, board.getBdIdx(), user.getUserName());

	}

	// 댓글 수정
	@Transactional
	public CommentResponseDTO updateComment(Long cmtIdx, CommentRequestDTO commentRequestDTO) throws Exception {

		User user = userRepository.findByUserEmail(commentRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));
		Board board = boardRepository.findBybdIdx(commentRequestDTO.getBdIdx())
				.orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
		Comment comment = commentRepository.findById(cmtIdx)
				.orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));

		if (!commentRequestDTO.getUserEmail().equals(comment.getUser().getUserEmail()))
			throw new Exception("댓글 작성자만 수정할 수 있습니다.");
		comment = commentRequestDTO.fill(comment);
		this.commentRepository.save(comment);
		return new CommentResponseDTO(comment, board.getBdIdx(), user.getUserName());
	}

	// 댓글 삭제
	@Transactional
	public CommentSuccessDTO deleteComment(Long cmtIdx, final CommentRequestDTO commentRequestDTO) throws Exception {
		Comment comment = commentRepository.findById(cmtIdx)
				.orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));
		log.info("idx = {}", cmtIdx);
		System.out.println(cmtIdx);
		if (!commentRequestDTO.getUserEmail().equals(comment.getUser().getUserEmail()))
			throw new Exception("댓글 작성자만 수정할 수 있습니다.");
		log.info("email = {}", commentRequestDTO.getUserEmail());
		System.out.println(commentRequestDTO.getUserEmail());
		commentRepository.deleteById(cmtIdx);
		return new CommentSuccessDTO(true);
	}

	// @Transactional
	// public CommentSuccessDTO deleteComment(Long cmtIdx, String userEmail) throws
	// Exception {
	// Comment comment = commentRepository.findById(cmtIdx)
	// .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));

	// if (!userEmail.equals(comment.getUser().getUserEmail()))
	// throw new Exception("댓글 작성자만 수정할 수 있습니다.");
	// commentRepository.deleteById(cmtIdx);
	// return new CommentSuccessDTO(true);
	// }

}
