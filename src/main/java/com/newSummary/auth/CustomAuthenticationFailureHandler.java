package com.newSummary.auth;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
    	// ObjectMapper 생성
    	ObjectMapper objectMapper = new ObjectMapper();

    	// 로그인 성공 시 응답 생성
    	Map<String, Object> data = new HashMap<>();
    	data.put("success", false);
    	data.put("message", "로그인 실패");

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
