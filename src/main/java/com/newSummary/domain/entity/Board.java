package com.newSummary.domain.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.newSummary.domain.dto.board.BoardRequestDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "tb_board")
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "INT")
	private Long bdIdx;

	@Column(columnDefinition = "TEXT")
	private String bdContent;

	@Column(length = 1200)
	private String bdUrl;

	@CreationTimestamp
	@Column(updatable = false, columnDefinition = "DATETIME")
	private LocalDateTime createdAt;

	@Column(columnDefinition = "int default 0")
	private int bdViews;

	@Column(columnDefinition = "int default 0")
	private int bdLikes;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_email")
	private User user;

	@JsonManagedReference
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	private List<Comment> comments;

	@JsonManagedReference
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	private List<File> files;

	public Board(BoardRequestDTO requestDTO) {
		this.bdIdx = requestDTO.getBdIdx();
		this.bdContent = requestDTO.getBdContent();
		this.bdUrl = requestDTO.getBdUrl();
		this.createdAt = requestDTO.getCreatedAt();

	}
}
