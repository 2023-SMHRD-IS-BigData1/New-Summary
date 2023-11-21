package com.newSummary.domain.entity;

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

@Entity
@Getter
@Builder
@NoArgsConstructor(access= AccessLevel.PROTECTED) 
@AllArgsConstructor
@Table(name ="tb_point")
public class Point {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pointIdx;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_email")
	private User user;
	
	@Column(length = 30)
	private String pointType;
	private int pointVal;
}
