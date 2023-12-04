package com.newSummary.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.NewsDTO;
import com.newSummary.domain.entity.Keyword;
import com.newSummary.domain.entity.News;
import com.newSummary.repository.NewsRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NewsService {

	@Autowired
	private final NewsRepository newsRepository;
	private final KeywordService keywordService;

	// 전체 리스트 조회(기사 작성시간 내림차순)
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
	public List<NewsDTO> cateNews(String category) {
		List<News> newsList = newsRepository.findByCategory(category);
		List<NewsDTO> newsDTOList = newsList.stream().map(this::convertToDTO).collect(Collectors.toList());
		return newsDTOList;
	}
	// 카테고리 랜덤 뉴스 데이터
	public List<NewsDTO> cateRandomNews(String category) {
		List<News> newsList = newsRepository.findByCategory(category);
		List<NewsDTO> newsDTOList = newsList.stream().map(this::convertToDTO).collect(Collectors.toList());
		List<NewsDTO> randomNewsList = getRandomNews(newsDTOList, 5);
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
	// 키워드 뉴스 데이터
	public List<NewsDTO> keywordNews(){
		Keyword keyword = keywordService.getkeyword();
		Map<String, Integer> keywordMap = keyword.getKeywordsData();
		List<String> topKeys = findTopKeys(keywordMap, 4);
		List<NewsDTO> newsDTOList = new ArrayList<NewsDTO>();
	    for(String key : topKeys) {
	        List<News> newsList = newsRepository.findByTitleRegexOrReporterRegexOrArticleContentRegexIgnoreCase(key, key, key);

	        for(News news : newsList) {
	            NewsDTO dto = convertToDTO(news);
	            dto.setKeyword(key);
	            newsDTOList.add(dto);
	        }
	    }
	    return newsDTOList;
	}
	// 상위키워드 추출
    public static List<String> findTopKeys(Map<String, Integer> map, int topCount) {
        // Map.Entry를 리스트로 변환
        List<Entry<String, Integer>> entryList = new ArrayList<>(map.entrySet());

        // 값으로 내림차순 정렬
        entryList.sort(Entry.comparingByValue(Comparator.reverseOrder()));

        // 상위 키 추출
        List<String> topKeys = new ArrayList<>();
        for (int i = 0; i < Math.min(topCount, entryList.size()); i++) {
            topKeys.add(entryList.get(i).getKey());
        }

        return topKeys;
    }
}
