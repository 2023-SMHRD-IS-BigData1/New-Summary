package com.newSummary.domain.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "tb_file")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileIdx;

    @Column(length = 1000)
    private String fileName;

    @Column(length = 1000)
    private String fileOriginName;

    private Integer fileSize;

    @Column(length = 10)
    private String fileExt;

    @Column(length = 1000)
    private String fileThumb;

    @UpdateTimestamp
	@Column(columnDefinition = "DATETIME")
    private LocalDateTime uploadedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bd_idx")
    private Board board;
}