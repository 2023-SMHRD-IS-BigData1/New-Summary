package com.newSummary.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newSummary.domain.UserRole;
import com.newSummary.domain.dto.UserDTO;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	// 회원 가입
	public User userSave(UserDTO userDTO){
        return userRepository.save(User.builder()
        		.userEmail(userDTO.getUserEmail())
                .userPw(passwordEncoder.encode(userDTO.getUserPw()))
                .userName(userDTO.getUserName())
                .userPhone(userDTO.getUserPhone())
                .userProfile(userDTO.getUserProfile())
                .userRole(UserRole.U)
                .build());
 
    }
	
	public User adminSave(UserDTO userDTO){
        return userRepository.save(User.builder()
        		.userEmail(userDTO.getUserEmail())
                .userName(userDTO.getUserName())
                .userPw(passwordEncoder.encode(userDTO.getUserPw()))
                .userPhone(userDTO.getUserPhone())
                .userProfile(userDTO.getUserProfile())
                .userRole(UserRole.A)
                .build());
    }
	
	// 이메일로 회원조회
	public UserDTO findByUserEmail(String userEmail) {
		UserDTO userDTO = UserDTO.toUserDTO(userRepository.findByUserEmail(userEmail));
        return userDTO;
	}
	
	// 회원 전체 조회
    public List<UserDTO> findUserAll(){
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();
        for(User user : userList){
            if(user.getUserRole() == UserRole.U){
                userDTOList.add(UserDTO.toUserDTO(user));
            }
        }
        return userDTOList;
    }
    
    // 관리자 전체 조회
    public List<UserDTO> findAdminAll(){
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();
        for(User user : userList){
            if(user.getUserRole() == UserRole.A){
                userDTOList.add(UserDTO.toUserDTO(user));
            }
        }
        return userDTOList;
    }
    
    // 회원 정보 수정
    public void editUser(UserDTO originalUserDTO, UserDTO userDTO) {
    	originalUserDTO.setUserRole(UserRole.U);
    	originalUserDTO.setUserName(userDTO.getUserName());
    	originalUserDTO.setUserPw(userDTO.getUserPw());
    	originalUserDTO.setUserPhone(userDTO.getUserPhone());
    	originalUserDTO.setUserProfile(userDTO.getUserProfile());
    	userRepository.save(User.toEditUserEntity(originalUserDTO, passwordEncoder));
    }
    
    // 관리자 정보 수정
    public void editAdmin(UserDTO originalUserDTO, UserDTO userDTO){
      	originalUserDTO.setUserRole(UserRole.A);
    	originalUserDTO.setUserName(userDTO.getUserName());
    	originalUserDTO.setUserPw(userDTO.getUserPw());
    	originalUserDTO.setUserPhone(userDTO.getUserPhone());
    	originalUserDTO.setUserProfile(userDTO.getUserProfile());
        userRepository.save(User.toEditUserEntity(originalUserDTO, passwordEncoder));
    }

    // 회원탈퇴
    public void deleteByEmail(String userEmail) {
    	userRepository.deleteById(userEmail);
    }
    
    // 이메일 중복 체크
    @Transactional(readOnly =true)
    public boolean checkUserEmail(String userEmail) {
    	return userRepository.existsByUserEmail(userEmail);
    }
    
    
    
}