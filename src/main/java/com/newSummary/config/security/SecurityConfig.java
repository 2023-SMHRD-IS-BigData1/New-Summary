package com.newSummary.config.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.newSummary.config.oauth.Oauth2UserService;
import com.newSummary.domain.UserRole;

import lombok.RequiredArgsConstructor;

@Configuration // 스프링의 환경설정 파일임을 명시 - 스프링 시큐리티 설정을 위해 사용
@EnableWebSecurity // 스프링 시큐리티를 활성화 - 스프링 시큐리티 설정을 할 수 있게 해줌
@RequiredArgsConstructor
public class SecurityConfig{

    private final AuthenticationFailureHandler customFailureHandler;
    private final Oauth2UserService oauth2UserService;
	


	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorizeHttpRequests)-> authorizeHttpRequests	
                        .requestMatchers("/user/**").authenticated()
                        .requestMatchers("/admin/**").hasRole(UserRole.A.name())
                        .anyRequest().permitAll()
                )
                .formLogin((form)->form
                        .loginPage("/login") // 사용자 정의 로그인 페이지
                        .defaultSuccessUrl("/index")
                        .loginProcessingUrl("/login") // 로그인 성공 후 이동 페이지
                        .usernameParameter("userEmail").passwordParameter("userPw")
                        .failureHandler(customFailureHandler)
                )
                .logout((logout)->logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true)
                )
                .oauth2Login((oauth2) -> oauth2
                		.loginPage("/login").defaultSuccessUrl("/")
                		.userInfoEndpoint( (userInfo) -> userInfo
                                .userService(oauth2UserService))
                );
        return http.build();
    }


		
}