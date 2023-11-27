package com.newSummary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.newSummary.domain.entity.NewsLog;

@Repository
public interface LogRepository extends JpaRepository<NewsLog, Long>{
	
}
