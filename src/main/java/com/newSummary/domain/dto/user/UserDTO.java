package com.newSummary.domain.dto.user;



import java.time.LocalDateTime;

import com.newSummary.domain.UserRole;
import com.newSummary.domain.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String userEmail;
    private String userPw;
    private String userName;
    private String userPhone;
    private LocalDateTime joinedAt;
    private String userProfile;
    private UserRole userRole;
    private String userType;
    private String userToken;
    
    // User 용
    public static UserDTO toUserDTO(User user){
    	UserDTO userDTO = new UserDTO();
    	userDTO.setUserEmail(user.getUserEmail());
    	userDTO.setUserPw(user.getUserPw());
    	userDTO.setUserName(user.getUserName());
    	userDTO.setUserPhone(user.getUserPhone());
    	userDTO.setUserProfile(user.getUserProfile());
    	userDTO.setJoinedAt(user.getJoinedAt());
    	userDTO.setUserRole(UserRole.U);
    	userDTO.setUserType(user.getUserType());
    	userDTO.setUserToken(user.getUserToken());
    	return userDTO;
    }
}
