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
import org.springframework.web.bind.annotation.RequestParam;
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
			bindingResult.addError(new FieldError("joinRequest", " userEmail", "이메일이 중복됩니다."));
		}
		// 전화번호 중복 체크
		if (userService.checkUserEmailDuplicate(joinRequest.getUserPhone())) {
			bindingResult.addError(new FieldError("joinRequest", " userPhone", "전화번호가 중복됩니다."));
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
	public Boolean checkUserEmail(@PathVariable("userEmail") String userEmail) {
		if (userService.checkUserEmailDuplicate(userEmail) == true) {
			log.info("userEmail={},message={}", userEmail, "이메일이 중복됩니다.다시 확인해주세요.");
			return true;
		} else {
			log.info("userEmail={},message={}", userEmail, "이메일 사용 가능합니다.");
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
	public UserDTO editMypageUser(@PathVariable("userEmail") String userEmail,
								  @RequestBody UserDTO userDTO) {
		if (userService.checkUserPhoneDuplicate(userDTO.getUserPhone()) == false) {
			log.info("userUpdate : userEmail={}, message={} ", userEmail,"회원정보 update 성공");
			UserDTO originUserDTO = userService.findByUserEmail(userEmail);
			userService.updateUserInfo(originUserDTO, userDTO);

			User user = userService.getLoginUserByEmail(userDTO.getUserEmail());
			UserDTO UpdateuserDTO = UserDTO.toUserDTO(user);
			return UpdateuserDTO;
		} else {
			log.info("userUpdate : userEmail={}, message={} ", userEmail,"회원정보 update 실패");
			return null;
		}

	}

	// 회원 정보 삭제
	@DeleteMapping("/users/{userEmail}")
	public void deleteUser(@PathVariable("userEmail") String userEmail) {
		log.info("delete : userEmail={}, message={}", userEmail,"삭제 성공");
		userService.userDelete(userEmail);
	}

	// 회원 프로필 업로드
	@PostMapping("/user/profile/{userEmail}")
	public ResponseEntity<?> uploadProfilePhoto(@PathVariable("userEmail") String userEmail, @RequestParam("profilePhoto") MultipartFile multipartFile) throws IOException {
		//S3 Bucket 내부에 "/profile"

		FileUploadResponse profile = s3UploaderService.upload(userEmail, multipartFile, "profile");
		return ResponseEntity.ok(profile);
	}
	// 회원 프로필 수정
    @PutMapping("/user/profile/{userEmail}")
    public ResponseEntity<?> updateProfilePhoto(@PathVariable("userEmail") String userEmail, @RequestParam("newProfilePhoto") MultipartFile newProfilePhoto) throws IOException {
        // S3 Bucket 내부에 "/profile"
        String dirName = "profile";

        // 프로필 수정 메소드 호출
        FileUploadResponse updatedProfile = s3UploaderService.updateProfile(userEmail, newProfilePhoto, dirName);

        return ResponseEntity.ok(updatedProfile);
    }

}
