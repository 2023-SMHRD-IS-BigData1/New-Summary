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

	// 회원 누적 포인트 보여주기
	@Transactional
	public PointResponseDTO totalPoint(String userEmail) {

		User user = userRepository.findByUserEmail(userEmail)
				.orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

		Point point = pointRepository.findByUser(user)
				.orElseThrow(() -> new EntityNotFoundException("포인트를 찾을 수 없습니다."));

		int totalPoints = point.getNewsClick() + point.getBoardWrite() + point.getCommentWrite();
		System.out.println(totalPoints);
		point.setPointVal(totalPoints);
		this.pointRepository.save(point);

		return new PointResponseDTO(point, user.getUserName());

	}

	// 뉴스 클릭시 포인트 올리기
	@Transactional
	public void newsClick(PointRequestDTO pointRequestDTO) {

		User user = userRepository.findByUserEmail(pointRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));
		Point point = pointRepository.findByUser(user)
				.orElseThrow(() -> new EntityNotFoundException("포인트를 찾을 수 없습니다."));

		int updatedPoints = Math.min(point.getNewsClick() + 1, 20);
		point.setNewsClick(updatedPoints);
		pointRepository.save(point);
	}

	// 게시글 작성시 포인트 올리기
	@Transactional
	public void boardWrite(PointRequestDTO pointRequestDTO) {

		User user = userRepository.findByUserEmail(pointRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));
		Point point = pointRepository.findByUser(user)
				.orElseThrow(() -> new EntityNotFoundException("포인트를 찾을 수 없습니다."));

		int updatedPoints = Math.min(point.getBoardWrite() + 1, 10);
		point.setBoardWrite(updatedPoints);
		pointRepository.save(point);
	}

	// 댓글 작성시 포인트 올리기
	@Transactional
	public void commentWrite(PointRequestDTO pointRequestDTO) {

		User user = userRepository.findByUserEmail(pointRequestDTO.getUserEmail())
				.orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));
		Point point = pointRepository.findByUser(user)
				.orElseThrow(() -> new EntityNotFoundException("포인트를 찾을 수 없습니다."));

		int updatedPoints = Math.min(point.getCommentWrite() + 1, 20);
		point.setCommentWrite(updatedPoints);
		pointRepository.save(point);
		System.out.println(point.getCommentWrite());
	}

	// 처음 포인트 저장
	public void initializePoint(String userEmail) {

		User user = userRepository.findByUserEmail(userEmail)
				.orElseThrow(() -> new EntityNotFoundException("회원을 찾을 수 없습니다."));

		// 처음 포인트를 저장
		Point point = Point.builder().user(user).newsClick(0).boardWrite(0).commentWrite(0).pointVal(0).build();

		pointRepository.save(point);

	}

}
