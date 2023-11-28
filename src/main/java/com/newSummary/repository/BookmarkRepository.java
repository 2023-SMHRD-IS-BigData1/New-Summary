package com.newSummary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.newSummary.domain.entity.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long>{
	
}
