package com.newSummary.domain.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "tb_point")
public class Point {
	// 포인트 순번
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pointIdx;

	// 회원 아이디
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_email")
	private User user;
	
	// 날짜
    @Column(name = "point_date")
    private LocalDate pointDate;
    
	// 획득 구분
	@Column(columnDefinition = "int default 0")
	private int newsClick;

	@Column(columnDefinition = "int default 0")
	private int boardWrite;

	@Column(columnDefinition = "int default 0")
	private int commentWrite;

	// 획득 점수
	@Column(columnDefinition = "int default 0")
	private int pointVal;

	// 점수 증가 메서드
	public void incrementNewsClick() {
		this.newsClick++;
	}
	public void incrementBoardWrite() {
		this.newsClick++;
	}
	public void incrementCommentWrite() {
		this.newsClick++;
	}
	
}