package com.newSummary.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.newSummary.domain.entity.Keyword;

@Repository
public interface KeywordsRepository extends MongoRepository<Keyword, String> {
	
    // 특정 날짜의 데이터 조회
    Keyword findByKeywordWriteTime(String date);
}
