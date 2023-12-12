package com.newSummary.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newSummary.config.PasswordEncyptor;
import com.newSummary.domain.UserRole;
import com.newSummary.domain.dto.user.JoinRequest;
import com.newSummary.domain.dto.user.LoginRequest;
import com.newSummary.domain.dto.user.UserDTO;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	@Autowired
	private final UserRepository userRepository;
	private final PasswordEncyptor encoder;
	private final PointService pointService;

	// userEmail 중복 체크 중복되면 true return
	@Transactional(readOnly = true)
	public boolean checkUserEmailDuplicate(String userEmail) {
		return userRepository.existsByUserEmail(userEmail);
	}

	// userName 중복 체크 중복되면 true return
	@Transactional(readOnly = true)
	public boolean checkUserNameDuplicate(String userName) {
		return userRepository.existsByUserName(userName);
	}

	// userPhone 중복 체크 중복되면 true return
	@Transactional(readOnly = true)
	public boolean checkUserPhoneDuplicate(String userPhone) {
		return userRepository.existsByUserPhone(userPhone);
	}

	// 암호화 안된 회원가입(확인용)
	public void join(JoinRequest req) {
		userRepository.save(req.toEntity());
	}

	// 암호화된 회원가입
	public void join2(JoinRequest req) {
		userRepository.save(req.toEntity(PasswordEncyptor.encryptPassword(req.getUserPw())));
		pointService.initializePoint(req.getUserEmail());
	}

	// 이메일로 회원조회
	public UserDTO findByUserEmail(String userEmail) {
		UserDTO userDTO = UserDTO.toUserDTO(userRepository.findByUserEmail(userEmail).get());
		return userDTO;
	}

	/**
	 * 로그인 기능 화면에서 LoginRequest(userEmail, userPw)을 입력받아 userEmail과 userPw가 일치하면
	 * User return userEmail이 존재하지 않거나 userPw가 일치하지 않으면 null return 안씀
	 */
	public User login(LoginRequest req) {
		Optional<User> optionalUser = userRepository.findByUserEmail(req.getUserEmail());

		// loginId와 일치하는 User가 없으면 null return
		if (optionalUser.isEmpty()) {
			return null;
		}

		User user = optionalUser.get();

		// 찾아온 User의 userPw와 입력된 userPw가 다르면 null return
		if (!user.getUserPw().equals(PasswordEncyptor.encryptPassword(req.getUserPw()))) {
			return null;
		}

		return user;
	}

	/**
	 * userEmail(String)를 입력받아 User을 return 해주는 기능 인증, 인가 시 사용 userEmail가
	 * null이거나(로그인 X) userEmail로 찾아온 User가 없으면 null return userEmail로 찾아온 User가 존재하면
	 * User return
	 */
	public User getLoginUserByEmail(String userEmail) {
		if (userEmail == null) {
			return null;
		}
		Optional<User> optionalUser = userRepository.findByUserEmail(userEmail);
		if (optionalUser.isEmpty()) {
			return null;
		}
		return optionalUser.get();
	}

	// 회원 정보 수정
	public void updateUserInfo(UserDTO originUserDTO, UserDTO userDTO) {
		originUserDTO.setUserEmail(userDTO.getUserEmail());
		originUserDTO.setUserRole(UserRole.U);
		originUserDTO.setUserName(userDTO.getUserName());
		originUserDTO.setUserPw(userDTO.getUserPw());
		originUserDTO.setUserPhone(userDTO.getUserPhone());
		userRepository.save(User.toEditUserEntity(originUserDTO, encoder));
	}
	// 회원 정보 수정
	public void updateUserInfo(UserDTO originUserDTO, UserDTO userDTO, String profile) {
		originUserDTO.setUserEmail(userDTO.getUserEmail());
		originUserDTO.setUserRole(UserRole.U);
		originUserDTO.setUserName(userDTO.getUserName());
		originUserDTO.setUserPw(userDTO.getUserPw());
		originUserDTO.setUserPhone(userDTO.getUserPhone());
		originUserDTO.setUserProfile(profile);
		userRepository.save(User.toEditUserEntity(originUserDTO, encoder));
	}

	// 회원 정보 삭제
	public void userDelete(String userEmail) {
		userRepository.deleteByUserEmail(userEmail);
	}

}