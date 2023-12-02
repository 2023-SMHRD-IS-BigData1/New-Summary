package com.newSummary.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.newSummary.auth.CustomAuthenticationFailureHandler;
import com.newSummary.auth.CustomAuthenticationSuccessHandler;
import com.newSummary.auth.CustomLogoutSuccessHandler;
import com.newSummary.auth.oauth.PrincipalOauth2UserService;
import com.newSummary.domain.UserRole;

import lombok.RequiredArgsConstructor;

/**
 * Form Login에 사용하는 Security Config
 */

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final PrincipalOauth2UserService principalOauth2UserService;

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)throws Exception{
		// AuthenticationManager - 얘가 인증을 관리함
		return authenticationConfiguration.getAuthenticationManager();
	}
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173","http://localhost:8081")); // 프론트엔드 서버 주소
        configuration.setAllowedMethods(Arrays.asList("GET", "POST","PUT","PATCH","DELETE")); 
        configuration.setAllowCredentials(true); // 세션 사용에 필요

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
		        .csrf(AbstractHttpConfigurer::disable)
		        .cors(cors -> cors.configurationSource(corsConfigurationSource())) //리액트 연결을 위한 것
		        // 권한에 따라 허용하는 url 설정
				.authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
						// 인증
//						.requestMatchers("/users/info").authenticated() //유저가 로그인해야만 볼 수 있는 것
//						// 인가
//						.requestMatchers("/admins/**").hasRole(UserRole.A.name()) //
						.requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
				)
				// 폼방식 적용
				.formLogin((form) -> form
						// 로그인시 사용할 파라미터
						.loginPage("/")
						.loginProcessingUrl("/api/login")
						.usernameParameter("userEmail").passwordParameter("userPw")
//						.defaultSuccessUrl("/",true) // 로그인 성공 시 이동할 URL
//						.failureUrl("/login?error=true") // 로그인 실패 시 이동할 URL
						.successHandler(new CustomAuthenticationSuccessHandler())
						.failureHandler(new CustomAuthenticationFailureHandler())
				)
				.logout((logout) -> logout
						.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
						.logoutUrl("/api/logout")
						.logoutSuccessHandler(new CustomLogoutSuccessHandler())
			            .invalidateHttpSession(true)
			            .deleteCookies("JSESSIONID")
			    )
				.oauth2Login((oauth2) -> oauth2
						 .loginProcessingUrl("/api/login/oauth")
//						 .defaultSuccessUrl("/",true)
						 .successHandler(new CustomAuthenticationSuccessHandler())
						 .failureHandler(new CustomAuthenticationFailureHandler())
						 .userInfoEndpoint((userInfo) -> userInfo
								.userService(principalOauth2UserService))
				);
	
		return http.build();
	}
}
