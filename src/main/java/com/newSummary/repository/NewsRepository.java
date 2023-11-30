package com.newSummary.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.newSummary.domain.entity.News;

@Repository
public interface NewsRepository extends MongoRepository<News, String>{
	
	// 전체 뉴스 리스트 조회
	List<News> findAllByOrderByViewCountDesc();
	
	// 뉴스 상세 리스트 조회
	Optional<News> findById(String id);
	
	// 검색
    List<News> findByTitleRegexOrReporterRegexOrArticleContentRegexIgnoreCase(String title, String reporter, String articleContent);
    
    // 카테고리 내 추천 기능
    List<News> findByCategory(String category);
}
