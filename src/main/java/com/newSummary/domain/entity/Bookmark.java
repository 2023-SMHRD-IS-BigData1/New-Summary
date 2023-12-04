package com.newSummary.domain.entity;


import com.newSummary.domain.dto.bookmark.BookmarkRequestDTO;

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
@Table(name = "tb_bookmark")
public class Bookmark {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkIdx;

    @Column(length = 120)
    private String newsObjectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_email")
    private User user;
    

    public Bookmark(BookmarkRequestDTO bookmarkRequestDTO) {
        this.newsObjectId = bookmarkRequestDTO.getNewsObjectId();
        this.user = bookmarkRequestDTO.getUser();
    }

}

