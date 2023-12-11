package com.newSummary.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.newSummary.domain.dto.board.BoardRequestDTO;
import com.newSummary.domain.dto.board.BoardResponseDTO;
import com.newSummary.domain.dto.board.BoardSuccessDTO;
import com.newSummary.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/board", produces = "application/json")
public class BoardController {

	@Autowired
	private final BoardService boardService;

	// 게시판 전체 목록
	@GetMapping("/listdata")
	public List<BoardResponseDTO> boardList() {
		return boardService.boardList();
	}

	@GetMapping("/list")
	public List<BoardResponseDTO> boardList(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize) {
		// page와 pageSize를 이용하여 적절한 범위의 데이터를 가져와 응답합니다.
		return boardService.getBoardListPaged(page, pageSize);
	}

	// 게시글 상세 보기
	@GetMapping("/detail/{bdIdx}")
	public BoardResponseDTO boardDetail(@PathVariable("bdIdx") Long bdIdx) {
		return boardService.boardDetail(bdIdx);
	}

	// 게시글 입력
	@PostMapping("/create")
	public BoardResponseDTO createBoard(@RequestPart(value = "BoardRequestDTO") BoardRequestDTO boardRequestDTO,
			@RequestPart(value = "boardPhoto", required = false) MultipartFile multipartFile) throws IOException {
		return (multipartFile != null) ? boardService.createBoard(boardRequestDTO, multipartFile)
				: boardService.createBoard(boardRequestDTO);
	}

	// 게시글 수정
	@PutMapping("/update/{bdIdx}")
	public BoardResponseDTO updateBoard(@PathVariable Long bdIdx,
			@RequestPart(value = "BoardRequestDTO") final BoardRequestDTO boardRequestDTO,
			@RequestPart(value = "boardPhoto", required = false) MultipartFile multipartFile) throws Exception {
		return (multipartFile != null) ? boardService.updateBoard(bdIdx, boardRequestDTO, multipartFile)
				: boardService.updateBoard(bdIdx, boardRequestDTO);
	}

	// 게시글 삭제
	@DeleteMapping("/delete/{bdIdx}")
	public BoardSuccessDTO deleteBoard(@PathVariable Long bdIdx, @RequestBody final BoardRequestDTO boardRequestDTO)
			throws Exception {
		return boardService.deleteBoard(bdIdx, boardRequestDTO);

	}

}
