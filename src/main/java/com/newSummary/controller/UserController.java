package com.newSummary.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.newSummary.config.security.SecurityDetails;
import com.newSummary.domain.dto.UserDTO;
import com.newSummary.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class UserController {

	private final UserService userService;
	  // 로그인 페이지 이동
    @GetMapping("/login")
    public String loginForm(@RequestParam(value="error", required = false) String error,
                            @RequestParam(value = "exception", required = false) String exception,
                           Model model){
        model.addAttribute("error", error);
        model.addAttribute("exception", exception);
        return "user/login";
    }

    // 회원가입 페이지 이동
    @GetMapping("/join")
    public String joinUserForm() {
        return "user/join";
    }
    // 마이페이지 이동
    @GetMapping("/user/mypage")
    public String mypage(){
        return "user/mypage";
    }
    // 회원 정보수정 페이지
    @GetMapping("/user/mypage/user")
    public String editMypageUserForm(@AuthenticationPrincipal SecurityDetails securityDetails,
                                     Model model){
    	UserDTO userDTO = userService.findByUserEmail(securityDetails.getUser().getUserEmail().toString());
        
        model.addAttribute("userDTO", userDTO);
        return "user/editUser";
    }
    
    @GetMapping("/logout")
    public String logout(){
        return "user/login";
    }
}
