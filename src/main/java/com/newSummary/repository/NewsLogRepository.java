package com.newSummary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.newSummary.domain.entity.NewsLog;
import com.newSummary.domain.entity.User;

@Repository
public interface NewsLogRepository extends JpaRepository<NewsLog, Long>{

	List<NewsLog> findByUser(User user);
	
}
