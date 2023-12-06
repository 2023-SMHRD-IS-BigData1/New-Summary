package com.newSummary.domain.dto.bookmark;


import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BookmarkRequestDTO {
	
	private String newsObjectId;
	private String userEmail;
	
}
