package com.newSummary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.board.BoardRequestDTO;
import com.newSummary.domain.dto.bookmark.BookmarkRequestDTO;
import com.newSummary.domain.dto.bookmark.BookmarkResponseDTO;
import com.newSummary.domain.entity.Bookmark;
import com.newSummary.repository.BookmarkRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookmarkService {
	
	@Autowired 
	BookmarkRepository bookmarkRepository;
	
	// 북마크 생성
	@Transactional
	public BookmarkResponseDTO createBookmark(BookmarkRequestDTO bookmarkRequestDTO) {
		Bookmark bookmark = new Bookmark(bookmarkRequestDTO);
		bookmarkRepository.save(bookmark);
		return new BookmarkResponseDTO(bookmark);
	}

}
