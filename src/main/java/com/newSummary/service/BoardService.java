package com.newSummary.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.board.BoardRequestDTO;
import com.newSummary.domain.dto.board.BoardResponseDTO;
import com.newSummary.domain.dto.board.BoardSuccessDTO;
import com.newSummary.domain.entity.Board;
import com.newSummary.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {
	
	@Autowired
	private final BoardRepository boardRepository;
	
	// 전체 게시글 리스트 가져오기
	@Transactional
	public List<BoardResponseDTO> boardList() {

		return boardRepository.findAllByOrderByCreatedAtDesc().stream()
				.map(BoardResponseDTO::new)
				.toList();

	}

	// 상세 게시글 가져오기 및 조회수 올리기
	@Transactional
	public Board boardDetail(Long bdIdx) {
		
		Optional<Board> bd  = this.boardRepository.findById(bdIdx);
		if(bd.isPresent()) {
			Board board = bd.get();
			board.setBdViews(board.getBdViews()+1);
			this.boardRepository.save(board);
			return board;
										
		}else {
			return null;
		}
		
	}

		// 게시물 작성
		@Transactional
		public BoardResponseDTO createBoard(BoardRequestDTO boardRequestDTO) {

			Board board = new Board(boardRequestDTO);
			boardRepository.save(board);
			return new BoardResponseDTO(board);

		}

		// 게시물 수정
		@Transactional
		public BoardResponseDTO updateBoard(Long bdIdx, final BoardRequestDTO boardRequestDTO) throws Exception {
			Board board = boardRepository.findById(bdIdx)
					.orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
			if (!boardRequestDTO.getUser().equals(board.getUser()))
				throw new Exception("게시글 작성자만 수정할 수 있습니다.");
			board = boardRequestDTO.fill(board);
			this.boardRepository.save(board);
			return new BoardResponseDTO(board);
		}
		
		// 게시물 삭제
		@Transactional
		public BoardSuccessDTO deleteBoard(Long bdIdx, final BoardRequestDTO boardRequestDTO) throws Exception{
			Board board = boardRepository.findById(bdIdx).orElseThrow(
					() -> new IllegalArgumentException("게시글이 존재하지 않습니다.")
			);
			if(!boardRequestDTO.getUser().equals(board.getUser()))
				throw new Exception("게시물을 삭제할 권한이 존재하지 않습니다.");
			
			boardRepository.deleteById(bdIdx);
			return new BoardSuccessDTO(true);
			
			
		}

}

