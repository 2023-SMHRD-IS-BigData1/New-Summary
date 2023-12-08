package com.newSummary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.point.PointRequestDTO;
import com.newSummary.domain.dto.point.PointResponseDTO;
import com.newSummary.domain.entity.Point;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.PointRepository;
import com.newSummary.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PointService {
	
	@Autowired
	private final PointRepository pointRepository;
	private final UserRepository userRepository;

	
	@Transactional
	public PointResponseDTO totalPoint(PointRequestDTO pointRequestDTO) {
		
		User user = userRepository.findByUserEmail(pointRequestDTO.getUserEmail())
	            .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));
		
		 Point point = pointRepository.findByUser(user)
		            .orElseThrow(() -> new EntityNotFoundException("포인트를 찾을 수 없습니다."));		
		int totalPoints = point.getNewsClick() + point.getBoardWrite() + point.getCommentWrite();
		point.setPointVal(totalPoints);
		this.pointRepository.save(point);

		return new PointResponseDTO(point, point.getUser().getUserName());
			
	}
	

	
	// 처음 포인트 저장 
	public void initializePoint(String userEmail) {

		 User user = userRepository.findByUserEmail(userEmail)
	                .orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

		// 처음 포인트를 저장
	        Point point = Point.builder()
	                .user(user)
	                .newsClick(0)
	                .boardWrite(0)
	                .commentWrite(0)
	                .pointVal(0)
	                .build();

	        pointRepository.save(point);
		
	}
	
	
	
	
	
}