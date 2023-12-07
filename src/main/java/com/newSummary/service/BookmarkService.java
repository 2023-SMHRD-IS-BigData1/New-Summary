package com.newSummary.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.board.BoardRequestDTO;
import com.newSummary.domain.dto.bookmark.BookmarkRequestDTO;
import com.newSummary.domain.dto.bookmark.BookmarkResponseDTO;
import com.newSummary.domain.dto.bookmark.BookmarkSuccessDTO;
import com.newSummary.domain.entity.Board;
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
	
	@Transactional
	// 북마크 생성
	public BookmarkResponseDTO createBookmark(BookmarkRequestDTO bookmarkRequestDTO) {
        // User 엔티티를 가져오는 코드
        User user = userRepository.findByUserEmail(bookmarkRequestDTO.getUserEmail())
                .orElseThrow(() -> new EntityNotFoundException("유저가 존재하지 않습니다"));
        // Bookmark 엔티티를 생성할 때 DTO의 userEmail을 이용
        Bookmark bookmark = Bookmark.builder()
                .newsObjectId(bookmarkRequestDTO.getNewsObjectId())
                .user(user)
                .build();
        bookmarkRepository.save(bookmark);
		return new BookmarkResponseDTO(bookmark,bookmarkRequestDTO.getUserEmail());
	}
	// 회원 북마크 데이터
	public List<BookmarkResponseDTO> getBookmark(String userEmail) {
        // User 엔티티를 가져오는 코드
        User user = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("유저가 존재하지 않습니다"));
        List<Bookmark> bookmarklist = bookmarkRepository.findByUser(user);
        return convertToBookmarkResponseDTOList(bookmarklist);
	}
    // Bookmark 엔티티를 BookmarkResponseDTO로 변환
    private List<BookmarkResponseDTO> convertToBookmarkResponseDTOList(List<Bookmark> bookmarkList) {
        return bookmarkList.stream()
                .map(bookmark -> new BookmarkResponseDTO(bookmark, bookmark.getUser().getUserEmail()))
                .collect(Collectors.toList());
    }
    // 북마크 삭제
	public BookmarkSuccessDTO deleteBookmark(Long bookmark_idx, String userEmail) {
		Bookmark bookmark = bookmarkRepository.findById(bookmark_idx).orElseThrow(
				() -> new IllegalArgumentException("북마크가 존재하지 않습니다.")
		);
        if (!bookmark.getUser().getUserEmail().equals(userEmail)) {
            throw new IllegalArgumentException("이 북마크를 삭제할 권한이 없습니다.");
        }
		bookmarkRepository.deleteById(bookmark_idx);
		return new BookmarkSuccessDTO(true);
	}

}
