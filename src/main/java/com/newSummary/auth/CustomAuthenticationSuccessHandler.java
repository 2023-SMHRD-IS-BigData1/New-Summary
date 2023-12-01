package com.newSummary.auth;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//    	 // 세션 가져오기
//        HttpSession session = request.getSession();
//
//        // 필요한 경우, 세션에 사용자 정보 저장
//        // 예: session.setAttribute("user", someUserInfoObject);
//
//        // 세션 유효시간 설정
//        session.setMaxInactiveInterval(60 * 60); // = 60분
    	
        // ObjectMapper 생성
    	ObjectMapper objectMapper = new ObjectMapper();

    	// 로그인 성공 시 응답 생성
    	Map<String, Object> data = new HashMap<>();
    	data.put("success", true);
    	data.put("message", "로그인 성공");

    	// ObjectMapper를 사용하여 JSON 문자열 생성
    	String jsonResponse = objectMapper.writeValueAsString(data);

    	// 응답 설정
    	response.setStatus(HttpServletResponse.SC_OK);
    	response.setContentType("application/json;charset=UTF-8");

    	// 응답 데이터 출력 (UTF-8로 인코딩)
    	response.setCharacterEncoding("UTF-8");
    	response.getWriter().println(jsonResponse);
    }
}
