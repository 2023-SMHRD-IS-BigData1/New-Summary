package com.newSummary.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BCryptConfig {
	// 암호화하는 빈
	@Bean
	PasswordEncoder passwordEncoder() {
		// 비밀번호를 암호화하기 위해 BCrypt 해싱 함수를 사용하는 PasswordEncoder 빈을 생성함
		return new BCryptPasswordEncoder();
	}
}