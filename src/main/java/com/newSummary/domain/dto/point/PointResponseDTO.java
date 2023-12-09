package com.newSummary.domain.dto.point;

import com.newSummary.domain.entity.Point;

import lombok.Data;

@Data
public class PointResponseDTO {

	private String userName;
	private int pointVal;
	
	
	public PointResponseDTO(Point point, String userName) {
		this.pointVal = point.getPointVal();
		this.userName = userName;

	}
}
