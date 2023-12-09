package com.newSummary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newSummary.domain.dto.point.PointRequestDTO;
import com.newSummary.domain.dto.point.PointResponseDTO;
import com.newSummary.service.PointService;

@RestController
@RequestMapping("/point")
public class PointController {

	@Autowired
	private PointService pointService;
	
	// 유저 전체 포인트 불러오기
	@GetMapping("/total/{userEmail}")
	public PointResponseDTO totalPoint(@PathVariable("userEmail") String userEmail) {

		return pointService.totalPoint(userEmail);
	}

	// 뉴스 클릭시 포인트 올리기 
	@PostMapping("/newsClick")
	public void newsClick(@RequestBody PointRequestDTO pointRequestDTO) {
		pointService.newsClick(pointRequestDTO);
	}
	
	// 게시글 작성시 포인트 올리기
	@PostMapping("/boardWrite")
	public void boardWrite(@RequestBody PointRequestDTO pointRequestDTO) {
		pointService.boardWrite(pointRequestDTO);
	}
	
	// 댓글 작성시 포인트 올리기
	@PostMapping("/commentWrite")
	public void commentWrite(@RequestBody PointRequestDTO pointRequestDTO) {
		pointService.commentWrite(pointRequestDTO);
	}
	
	
	
	
}

