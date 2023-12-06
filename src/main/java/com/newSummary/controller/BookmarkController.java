package com.newSummary.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newSummary.domain.dto.bookmark.BookmarkRequestDTO;
import com.newSummary.domain.dto.bookmark.BookmarkResponseDTO;
import com.newSummary.service.BookmarkService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/news/bookmark")
public class BookmarkController {
	
	@Autowired
	private BookmarkService bookmarkService;
	
	@PostMapping("/create")
	public BookmarkResponseDTO createBookmark(@RequestBody BookmarkRequestDTO bookmarkRequestDTO) {
		return bookmarkService.createBookmark(bookmarkRequestDTO);
	}
	@GetMapping("/{userEmail}")
	public List<BookmarkResponseDTO> getBookmark(@PathVariable String userEmail){
		return bookmarkService.getBookmark(userEmail);
	}
	@DeleteMapping("/delete/{bookmark_idx}")
	public String deleteBookmark(@PathVariable Long bookmark_idx) {
	    // 삭제 전에 삭제할 북마크의 사용자 정보를 가져옴
	    String userEmail = bookmarkService.getUserEmailByBookmarkId(bookmark_idx);
	    
	    bookmarkService.deleteBookmark(bookmark_idx);
//	    return "redirect:" + redirectUrl;
	    return "삭제성공";
	}
	

}
