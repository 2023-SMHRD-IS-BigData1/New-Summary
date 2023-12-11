package com.newSummary.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.newSummary.domain.dto.FileUploadResponse;
import com.newSummary.domain.dto.board.BoardRequestDTO;
import com.newSummary.domain.dto.board.BoardResponseDTO;
import com.newSummary.domain.dto.board.BoardSuccessDTO;
import com.newSummary.domain.entity.Board;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.BoardRepository;
import com.newSummary.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {

	@Autowired
	private final BoardRepository boardRepository;
	private final UserRepository userRepository;
	private final S3UploaderService s3UploaderService;

	// 전체 게시글 리스트 가져오기
	@Transactional
	public List<BoardResponseDTO> boardList() {

		return boardRepository.findAllByOrderByCreatedAtDesc().stream()
				.map(board -> new BoardResponseDTO(board, board.getUser().getUserName())).collect(Collectors.toList());

	}

	// 게시글 페이징 리스트
	public List<BoardResponseDTO> getBoardListPaged(int page, int pageSize) {
		List<Sort.Order> sorts = new ArrayList<>();
		sorts.add(Sort.Order.desc("createdAt"));
		Pageable pageable = PageRequest.of(page, pageSize, Sort.by(sorts));
		Page<Board> boardPage = boardRepository.findAll(pageable);

		// 가져온 데이터를 DTO로 변환하여 반환합니다.
		return boardPage.stream().map(board -> new BoardResponseDTO(board, board.getUser().getUserName()))
				.collect(Collectors.toList());
	}

	// 상세 게시글 가져오기 및 조회수 올리기
	@Transactional
	public BoardResponseDTO boardDetail(Long bdIdx) {

		Optional<Board> bd = this.boardRepository.findById(bdIdx);
		if (bd.isPresent()) {
			Board board = bd.get();
			board.setBdViews(board.getBdViews() + 1);
			this.boardRepository.save(board);
			return new BoardResponseDTO(board, board.getUser().getUserName());

		} else {
			return null;
		}

	}

	// 게시물 작성
	@Transactional
	public BoardResponseDTO createBoard(BoardRequestDTO boardRequestDTO) {

		User user = userRepository.findByUserEmail(boardRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("User not found"));
		Board board = Board.builder().bdContent(boardRequestDTO.getBdContent()).bdUrl(boardRequestDTO.getBdUrl())
				.user(user).build();
		boardRepository.save(board);
		return new BoardResponseDTO(board, user.getUserName());

	}

	// 게시물 사진까지 작성
	@Transactional
	public BoardResponseDTO createBoard(BoardRequestDTO boardRequestDTO, MultipartFile multipartFile)
			throws IOException {

		User user = userRepository.findByUserEmail(boardRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("User not found"));
		FileUploadResponse photo = s3UploaderService.boardUpload(boardRequestDTO.getUserEmail(), multipartFile,
				"bdProfile");
		Board board = Board.builder().bdContent(boardRequestDTO.getBdContent()).bdUrl(boardRequestDTO.getBdUrl())
				.user(user).bdProfile(photo.getUrl()).build();
		boardRepository.save(board);
		return new BoardResponseDTO(board, user.getUserName());
	}

	// 게시물 수정
	@Transactional
	public BoardResponseDTO updateBoard(Long bdIdx, final BoardRequestDTO boardRequestDTO) throws Exception {
		User user = userRepository.findByUserEmail(boardRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("User not found"));
		Board board = boardRepository.findById(bdIdx)
				.orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
		if (!boardRequestDTO.getUserEmail().equals(board.getUser().getUserEmail()))
			throw new Exception("게시글 작성자만 수정할 수 있습니다.");
		board = boardRequestDTO.fill(board);
		this.boardRepository.save(board);
		return new BoardResponseDTO(board, user.getUserName());
	}
	// 게시물 사진까지 수정
	@Transactional
	public BoardResponseDTO updateBoard(Long bdIdx, BoardRequestDTO boardRequestDTO, MultipartFile multipartFile) throws Exception {
		
		User user = userRepository.findByUserEmail(boardRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("User not found"));
		Board board = boardRepository.findById(bdIdx)
				.orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
		if (!boardRequestDTO.getUserEmail().equals(board.getUser().getUserEmail()))
			throw new Exception("게시글 작성자만 수정할 수 있습니다.");
		board = boardRequestDTO.fill(board);
		FileUploadResponse photo = s3UploaderService.updateBoardProfile(bdIdx, multipartFile,
				"bdProfile");
		this.boardRepository.save(board);
		return new BoardResponseDTO(board, user.getUserName());
	}
	// 게시물 삭제
	@Transactional
	public BoardSuccessDTO deleteBoard(Long bdIdx, final BoardRequestDTO boardRequestDTO) throws Exception {
		Board board = boardRepository.findById(bdIdx)
				.orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
		if (!boardRequestDTO.getUserEmail().equals(board.getUser().getUserEmail()))
			throw new Exception("게시물을 삭제할 권한이 존재하지 않습니다.");
	    // 게시물의 프로필 정보가 널이 아닌 경우에만 추가 로직 실행
	    if (board.getBdProfile() != null) {
	        String currentFileName = s3UploaderService.extractFileNameFromUrl(board.getBdProfile());
	        s3UploaderService.deleteFileFromS3(currentFileName);
	    }
		boardRepository.deleteById(bdIdx);
		return new BoardSuccessDTO(true);

	}


}
