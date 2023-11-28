package com.newSummary.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newSummary.domain.dto.UserDTO;
import com.newSummary.domain.entity.Bookmark;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.BookmarkRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookmarkService {
	
	@Autowired 
	BookmarkRepository bookmarkRepository;
	
//	public class UserMapper {
//
//	    public static User convertDtoToEntity(UserDTO userDTO) {
//	        User user = new User();
//	    	
//	        BeanUtils.copyProperties(userDTO, user);
//	        return user;
//	    }
//	}
//	public void createBookmark(String newsObjectId, UserDTO userDTO) {
//		User user = UserMapper.convertDtoToEntity(userDTO);
//		Bookmark b = Bookmark.builder()
//				.newsObjectId(newsObjectId)
//				.user(user)
//				.build();
//		bookmarkRepository.save(b);
//	}

}
