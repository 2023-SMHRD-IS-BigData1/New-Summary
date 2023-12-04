package com.newSummary.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.entity.Keyword;
import com.newSummary.repository.KeywordsRepository;

@Service
public class KeywordService {
	
	@Autowired
	KeywordsRepository keywordsRepository;
	
	public List<Keyword> getlist() {
		return this.keywordsRepository.findAll();
	}
	public Keyword getkeyword() {
		LocalDate date = LocalDate.now();
		System.out.println(date);
		return this.keywordsRepository.findByKeywordWriteTime(date.toString());
	}
}
