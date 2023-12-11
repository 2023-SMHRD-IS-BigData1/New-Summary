package com.newSummary.controller;


import java.util.List;

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
    // 뉴스 오늘 데이터
    @GetMapping("/today")
    public List<NewsDTO> getTodayNews() {
    	List<NewsDTO> newsList = newsService.todayNews();
        return newsList;
    }
    // 뉴스 상세 데이터
    @GetMapping("/detail/{id}")
	public NewsDTO NewsDetail(@PathVariable("id") String id,@RequestParam(name = "userEmail", required = false) String userEmail) {
    	return (userEmail != null) ? newsService.historyNews(id, userEmail) : newsService.detailNews(id);
    }
    // 조회수 상위 20개 뉴스
    @GetMapping("topView")
    public List<NewsDTO> viewTop20News() {
    	List<NewsDTO> newsList = newsService.viewTop20News();
    	return newsList;
    }
    // 카테고리 뉴스 데이터
    @GetMapping("/item")
    public List<NewsDTO> cateNews(@RequestParam String category){
    	List<NewsDTO> newsList = newsService.cateNews(category);
    	return newsList;
    }
    // 카테고리 뉴스 추천(랜덤, 조회수??로는)
    @GetMapping("/random")
    public List<NewsDTO> randomNews(@RequestParam String category) {
        List<NewsDTO> newsList = newsService.cateRandomNews(category);
        return newsList;
    }
    // 키워드 뉴스 리스트
    @GetMapping("/keyword")
    public List<NewsDTO> keywordNews() {
        List<NewsDTO> newsList = newsService.keywordNews();
        return newsList;
    }
    // 북마크한 뉴스 데이터
    @GetMapping("/bookmark")
    public List<NewsDTO> bookmarkNews(@RequestParam String userEmail){
        List<NewsDTO> newsList = newsService.bookmarkNews(userEmail);
        return newsList;
    }
    

}
