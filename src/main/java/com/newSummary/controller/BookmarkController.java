package com.newSummary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.newSummary.domain.dto.bookmark.BookmarkRequestDTO;
import com.newSummary.domain.dto.bookmark.BookmarkResponseDTO;
import com.newSummary.service.BookmarkService;

@Controller
@RequestMapping("/news/bookmark")
public class BookmarkController {
	
	@Autowired
	private BookmarkService bookmarkService;
	
	@PostMapping("/create")
	public BookmarkResponseDTO createBookmark(@RequestBody BookmarkRequestDTO bookmarkRequestDTO) {
		
		return bookmarkService.createBookmark(bookmarkRequestDTO);
	}

}
