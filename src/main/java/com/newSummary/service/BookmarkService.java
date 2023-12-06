package com.newSummary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.board.BoardRequestDTO;
import com.newSummary.domain.dto.bookmark.BookmarkRequestDTO;
import com.newSummary.domain.dto.bookmark.BookmarkResponseDTO;
import com.newSummary.domain.entity.Bookmark;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.BookmarkRepository;
import com.newSummary.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookmarkService {
	
	@Autowired 
	private final BookmarkRepository bookmarkRepository;
	private final UserRepository userRepository;
	
	// 북마크 생성
	@Transactional
	public BookmarkResponseDTO createBookmark(BookmarkRequestDTO bookmarkRequestDTO) {
        // User 엔티티를 가져오는 코드
        User user = userRepository.findByUserEmail(bookmarkRequestDTO.getUserEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        // Bookmark 엔티티를 생성할 때 DTO의 userEmail을 이용
        Bookmark bookmark = Bookmark.builder()
                .newsObjectId(bookmarkRequestDTO.getNewsObjectId())
                .user(user)
                .build();
        bookmarkRepository.save(bookmark);
		return new BookmarkResponseDTO(bookmark);
	}

}
