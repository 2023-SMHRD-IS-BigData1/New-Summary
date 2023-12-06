package com.newSummary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.newSummary.domain.entity.Bookmark;
import com.newSummary.domain.entity.User;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long>{

	List<Bookmark> findByUser(User user);
	
}
