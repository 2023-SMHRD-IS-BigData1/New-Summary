package com.newSummary.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newSummary.service.NewsLogService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("log")
public class NewsLogController {
	
	@Autowired
	NewsLogService newsLogService;
	
	@GetMapping("list")
	public List<String> getlog(@RequestParam String userEmail){
		List<String> logList = newsLogService.getLog(userEmail);
		return logList; 
	}

}
