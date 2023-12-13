package com.newSummary.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.newSummary.domain.dto.FileUploadResponse;
import com.newSummary.domain.dto.user.JoinRequest;
import com.newSummary.domain.dto.user.LoginRequest;
import com.newSummary.domain.dto.user.UserDTO;
import com.newSummary.domain.entity.User;
import com.newSummary.service.S3UploaderService;
import com.newSummary.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
	private final UserService userService;
	private final S3UploaderService s3UploaderService;

	@PostMapping("/users/join")
	public ResponseEntity<?> join(@Valid @RequestBody JoinRequest joinRequest, BindingResult bindingResult) {
		// 이메일 중복 체크
		if (userService.checkUserEmailDuplicate(joinRequest.getUserEmail())) {
			bindingResult.addError(new FieldError("joinRequest", "userEmail", "이메일이 중복됩니다."));
		}

		// 닉네임 중복 체크
		if (userService.checkUserNameDuplicate(joinRequest.getUserName())) {
			bindingResult.addError(new FieldError("joinRequest", "userName", "닉네임이 중복됩니다."));
		}

		// 전화번호 중복 체크
		if (userService.checkUserPhoneDuplicate(joinRequest.getUserPhone())) {
			bindingResult.addError(new FieldError("joinRequest", "userPhone", "전화번호가 중복됩니다."));
		}

		// password와 passwordCheck가 같은지 체크
		if (!joinRequest.getUserPw().equals(joinRequest.getPasswordCheck())) {
			bindingResult.addError(new FieldError("joinRequest", "passwordCheck", "비밀번호가 일치하지 않습니다."));
		}

		if (bindingResult.hasErrors()) {
			return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
		}

		userService.join2(joinRequest);
		return ResponseEntity.ok("회원가입 성공");
	}

	// 이메일 중복체크
	@GetMapping("/users/duplication-email/{userEmail}")
	public String checkUserEmail(@PathVariable("userEmail") String userEmail) {
		// 이메일 형식 검사
		String emailValidationResult = isValidEmail(userEmail);
		System.out.println(userEmail);
		System.out.println(emailValidationResult);
		if ("fail".equals(emailValidationResult)) {
			log.info("userEmail={},message={}", userEmail, "이메일 형식이 맞지 않습니다!!!!");
			System.out.println("이메일 형식 맞지않음");
			String responseData = "fail";

			return responseData;
		} else if ("true".equals(emailValidationResult)) {

			if (userService.checkUserEmailDuplicate(userEmail) == true) {

				log.info("userEmail={},message={}", userEmail, "이메일이 중복됩니다.다시 확인해주세요.");
				System.out.println("이메일 중복");
				String responseData = "true";

				return responseData;

			} else {
				log.info("userEmail={},message={}", userEmail, "이메일 사용가능합니다.");
				System.out.println("이메일 사용가능");
				String responseData = "false";

				return responseData;
			}
		}
		return null;
	}

	// 이메일 형식 검사 메서드
	private String isValidEmail(String email) {
		// 정규 표현식 사용 이메일 형식을 검사하는 로직 추가
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
		return email.matches(emailRegex) ? "true" : "fail";
	}

	// 닉네임 중복확인
	@GetMapping("/users/duplication-userName/{userName}")
	public Boolean checkUserName(@PathVariable("userName") String userName) {
		if (userService.checkUserNameDuplicate(userName) == true) {
			log.info("userName={},message={}", userName, "닉네임이 중복됩니다.다시 확인해주세요.");
			System.out.println("닉네임중복");
			return true;
		} else {
			log.info("userName={},message={}", userName, "닉네임 사용가능합니다.");
			System.out.println("닉네임사용가능");
			return false;
		}
	}

	// 전화번호 중복확인
	@GetMapping("/users/duplication-phone/{userPhone}")
	public Boolean checkNickname(@PathVariable("userPhone") String userPhone) {
		if (userService.checkUserPhoneDuplicate(userPhone) == true) {
			log.info("userPhone={},message={}", userPhone, "전화번호가 중복됩니다.다시 확인해주세요.");
			return true;
		} else {
			log.info("userPhone={},message={}", userPhone, "전화번호 사용가능합니다.");
			return false;
		}
	}

	// 로그인 요청
	@PostMapping("/users/loginuser")
	public UserDTO login(@Valid @RequestBody LoginRequest req) {
		User user = userService.login(req);
		if (user == null) {
			log.info("login: 실패");
			return null;
		}
		UserDTO userDTO = UserDTO.toUserDTO(user);
		log.info("login: 성공");
		return userDTO;
	}

	// 회원 정보 요청
	@GetMapping("/users/{userEmail}")
	public UserDTO userInfo(@PathVariable("userEmail") String userEmail) {
		UserDTO userDTO = userService.findByUserEmail(userEmail);
		return userDTO;
	}

	// 회원정보 수정
	@PatchMapping("/users/{userEmail}")
	public UserDTO editMypageUser(@PathVariable("userEmail") String userEmail, @RequestBody UserDTO userDTO) {
		if (userService.checkUserEmailDuplicate(userDTO.getUserEmail()) == true) {
			log.info("userUpdate : userEmail={}, message={} ", userEmail, "회원정보 update 성공");
			UserDTO originUserDTO = userService.findByUserEmail(userEmail);
			userService.updateUserInfo(originUserDTO, userDTO);

			User user = userService.getLoginUserByEmail(userDTO.getUserEmail());
			UserDTO UpdateuserDTO = UserDTO.toUserDTO(user);
			return UpdateuserDTO;
		} else {
			log.info("userUpdate : userEmail={}, message={} ", userEmail, "회원정보 update 실패");
			return null;
		}

	}

	// 회원정보 사진까지 수정
	@PatchMapping("/users/photo/{userEmail}")
	public UserDTO editMypageUserphoto(@PathVariable("userEmail") String userEmail, @RequestPart("UserDTO") UserDTO userDTO,
			@RequestPart("newProfilePhoto") MultipartFile newProfilePhoto) throws IOException  {
		if (userService.checkUserEmailDuplicate(userDTO.getUserEmail()) == true) {
			log.info("userUpdate : userEmail={}, message={} ", userEmail, "회원정보 update 성공");
			UserDTO originUserDTO = userService.findByUserEmail(userEmail);
			String dirName = "profile";
			// 프로필 수정 메소드 호출
			FileUploadResponse updatedProfile = s3UploaderService.updateProfile(userEmail, newProfilePhoto, dirName);
			userService.updateUserInfo(originUserDTO, userDTO,updatedProfile.getUrl());
			User user = userService.getLoginUserByEmail(userDTO.getUserEmail());
			UserDTO UpdateuserDTO = UserDTO.toUserDTO(user);
			return UpdateuserDTO;
		} else {
			log.info("userUpdate : userEmail={}, message={} ", userEmail, "회원정보 update 실패");
			return null;
		}
	}

	// 회원 정보 삭제
	@DeleteMapping("/users/{userEmail}")
	public void deleteUser(@PathVariable("userEmail") String userEmail) {
		log.info("delete : userEmail={}, message={}", userEmail, "삭제 성공");
		userService.userDelete(userEmail);
	}

}
