package com.newSummary.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.NewsDTO;
import com.newSummary.domain.entity.News;
import com.newSummary.repository.NewsRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NewsService {

	@Autowired
	private final NewsRepository newsRepository;

	// 전체 리스트 조회
	public List<NewsDTO> getNewsList() {
		List<News> newsList = this.newsRepository.findAllByOrderByArticleWriteTimeDesc();
		System.out.println("돼냐? " + newsList.size());

		// DTO 변환
		List<NewsDTO> newsDTOList = newsList.stream().map(this::convertToDTO).collect(Collectors.toList());

		return newsDTOList;
	}
	// 상세 리스트 조회 + 조회수 증가
	public NewsDTO detailNews(String id) {
		Optional<News> on = this.newsRepository.findById(id);
		if (on.isPresent()) {
			News news = on.get();
			news.incrementViewCount();
			this.newsRepository.save(news);
			NewsDTO newsDTO = convertToDTO(news);
			return newsDTO;
		} else {
			return null;
		}
	}
	// 엔터티를 DTO로 변환하는 메소드
	private NewsDTO convertToDTO(News news) {
		NewsDTO newsDTO = new NewsDTO();
		newsDTO.setId(news.getId());
		newsDTO.setTitle(news.getTitle());
		newsDTO.setReporter(news.getReporter());
		newsDTO.setArticleWriteTime(news.getArticleWriteTime());
		newsDTO.setPicture(news.getPicture());
		newsDTO.setArticleContent(news.getArticleContent());
		newsDTO.setPress(news.getPress());
		newsDTO.setUrl(news.getUrl());
		newsDTO.setCategory(news.getCategory());
		newsDTO.setViewCount(news.getViewCount());
		newsDTO.setSummary(news.getSummary());
		return newsDTO;
	}
	// 검색 서비스
	public List<NewsDTO> searchNews(String term) {
		List<News> newsList = newsRepository.findByTitleRegexOrReporterRegexOrArticleContentRegexIgnoreCase(term, term,
				term);
		List<NewsDTO> newsDTOList = newsList.stream().map(this::convertToDTO).collect(Collectors.toList());
		return newsDTOList;
	}
	// 카테고리 뉴스 데이터
	public List<NewsDTO> cateRandomNews(String category) {
		List<News> newsList = newsRepository.findByCategory(category);
		List<NewsDTO> newsDTOList = newsList.stream().map(this::convertToDTO).collect(Collectors.toList());
		return newsDTOList;
	}
}
