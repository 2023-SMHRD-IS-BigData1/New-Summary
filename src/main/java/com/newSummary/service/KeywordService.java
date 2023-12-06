package com.newSummary.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.entity.Keyword;
import com.newSummary.repository.KeywordsRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class KeywordService {
	
	@Autowired
	private final KeywordsRepository keywordsRepository;
	
	public List<Keyword> getlist() {
		return this.keywordsRepository.findAll();
	}
	public Keyword getkeyword() {
		LocalDate date = LocalDate.now();
		System.out.println(date);
		return this.keywordsRepository.findByKeywordWriteTime(date.toString());
	}
	public List<String> gettopkeys() {
		LocalDate date = LocalDate.now();
		System.out.println(date);
		List<String> topKeys = findTopKeys(this.keywordsRepository.findByKeywordWriteTime(date.toString()).getKeywordsData(), 10);
		return topKeys;
	}
	   // 상위키워드 추출
    public List<String> findTopKeys(Map<String, Integer> map, int topCount) {
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
