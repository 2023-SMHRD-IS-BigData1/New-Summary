package com.newSummary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

	@GetMapping("/total")
	public PointResponseDTO totalPoint(@RequestBody PointRequestDTO pointRequestDTO) {
		
		return pointService.totalPoint(pointRequestDTO);
	}
}
