package com.newSummary.controller;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newSummary.domain.dto.NewsDTO;
import com.newSummary.service.NewsService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/news")
public class NewsController {
	
	@Autowired
	private final NewsService newsService;
	
	// 뉴스 전체 데이터
    @GetMapping("/list")
    public List<NewsDTO> getNews() {
    	List<NewsDTO> newsList = newsService.getNewsList();
        return newsList;
    }
    @GetMapping("/detail/{id}")
    // 뉴스 상세 데이터
    public NewsDTO NewsDetail(@PathVariable("id") String id) {
    	NewsDTO dto = newsService.detailNews(id);
    	return dto;
    }
    // 뉴스 검색 데이터
    @GetMapping("/search")
    public List<NewsDTO> searchNews(@RequestParam String term) {
        return newsService.searchNews(term);
    }
    // 카테고리 뉴스 데이터
    @GetMapping("/item")
    public List<NewsDTO> cateNews(@RequestParam String category){
    	List<NewsDTO> newsList = newsService.cateRandomNews(category);
    	return newsList;
    }
    // 카테고리 뉴스 추천(랜덤, 조회수??로는)
    @GetMapping("/random")
    public List<NewsDTO> randomNews(@RequestParam String category) {
        List<NewsDTO> newsList = newsService.cateRandomNews(category);
        List<NewsDTO> randomNewsList = getRandomNews(newsList, 5);
        return randomNewsList;
    }
    // 랜덤 뉴스 리스트에 담는 메소드
    private List<NewsDTO> getRandomNews(List<NewsDTO> newsList, int count) {
        List<NewsDTO> randomNewsList = new ArrayList<>();
        Random random = new Random();

        Set<Integer> selectedIndices = new HashSet<>();
        int newsListSize = newsList.size();

        while (randomNewsList.size() < count && selectedIndices.size() < newsListSize) {
            int randomIndex = random.nextInt(newsListSize);
            if (selectedIndices.add(randomIndex)) {
                randomNewsList.add(newsList.get(randomIndex));
            }
        }
        return randomNewsList;
    }
    

}
