package com.newSummary.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newSummary.domain.entity.Keyword;
import com.newSummary.service.KeywordService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/keyword")
public class KeywordController {
	
	@Autowired
	private final KeywordService keywordService;
	
	@GetMapping("/list")
	public List<Keyword> getlist() {
		return keywordService.getlist();
	}
	@GetMapping("/today")
	public List<String> getKeyword() {
		return keywordService.gettopkeys();
	}

}
