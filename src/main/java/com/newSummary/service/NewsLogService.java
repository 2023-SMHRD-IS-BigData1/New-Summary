package com.newSummary.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.entity.NewsLog;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.NewsLogRepository;
import com.newSummary.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NewsLogService {
	
	@Autowired
	private final NewsLogRepository newsLogRepository;
	private final UserRepository userRepository;
	
	public List<String> getLog(String userEmail) {
        User user = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("유저가 존재하지 않습니다"));
		List<NewsLog> loglist = newsLogRepository.findByUser(user);
		List<String> categorylist = new ArrayList<>();
		for(int i=0;i<loglist.size();i++) {
			categorylist.add(loglist.get(i).getCategoryName());
		}
		return categorylist;
	}

}
