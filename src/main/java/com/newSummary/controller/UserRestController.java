package com.newSummary.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.newSummary.config.security.SecurityDetails;
import com.newSummary.domain.dto.UserDTO;
import com.newSummary.domain.entity.User;
import com.newSummary.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserRestController {

	private final UserService userService;
	
	// 로그인한 데이터
	@GetMapping("/me")
	public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal SecurityDetails currentUser) {
		User user = currentUser.getUser();
		UserDTO userDTO = UserDTO.toUserDTO(user);
		return ResponseEntity.ok(userDTO);
	}

	// 이메일 중복체크
	@GetMapping("/duplication-email")
	public ResponseEntity<Boolean> checkNickname(@RequestParam("userEmail") String userEmail) {
		return new ResponseEntity<>(userService.checkUserEmail(userEmail), HttpStatus.OK);
	}

	// 회원가입
	@ResponseBody
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody UserDTO userDTO) {
		userService.userSave(userDTO);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 회원정보 수정
	@PatchMapping("")
	public ResponseEntity<?> editMypageUser(@AuthenticationPrincipal SecurityDetails securityDetails,
			@RequestBody UserDTO userDTO) {
		UserDTO originalUserDTO = userService.findByUserEmail(securityDetails.getUser().getUserEmail());
		userService.editUser(originalUserDTO, userDTO);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 회원 탈퇴
	@ResponseBody
	@DeleteMapping("")
	public ResponseEntity<?> deleteMypageUser(@AuthenticationPrincipal SecurityDetails securityDetails)
			throws IOException {
		userService.deleteByEmail(securityDetails.getUser().getUserEmail());

//        List<BoardDTO> boardList = boardService.findUserBoard(securityDetails.getUser().getUserEmail());
//        for(int i = 0; i < boardList.size(); i++){
//            boardService.deleteById(boardList.get(i).getId());
//        }
//
//        List<CommentDTO> commentList = paymentService.findAll(securityDetails.getUser().getUserEmail());
//        for(long i = 0; i < commentList.size(); i++){
//            commentService.deleteById(i);
//        }
		return new ResponseEntity<>(HttpStatus.OK);
	}

}