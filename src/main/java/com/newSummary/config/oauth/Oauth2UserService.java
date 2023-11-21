package com.newSummary.config.oauth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.newSummary.config.security.SecurityDetails;
import com.newSummary.domain.UserRole;
import com.newSummary.domain.entity.User;
import com.newSummary.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Oauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 구글로부터 받은 userRequest 데이터에 대해 후처리하는 함수
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
        OAuth2User oauth2User = super.loadUser(userRequest);
        
        System.out.println(oauth2User);
        // 회원가입 강제 진행
        String provider = userRequest.getClientRegistration().getClientId();
        String providerId = oauth2User.getAttribute("sub");
        String userNickname = provider+"_"+providerId;
        String userEmail = oauth2User.getAttribute("email");
        String userProfile = oauth2User.getAttribute("picture");
        String userPassword = passwordEncoder.encode("겟인데어");
        String userPhone = "010-0000-0000";
        UserRole authority = UserRole.U;

        User user = userRepository.findByUserEmail(userEmail);

        if(user == null){
        	user = user.builder()
                    .userEmail(userEmail)
                    .userPw(userPassword)
                    .userName(userNickname)
                    .userRole(authority)
                    .userProfile(userProfile)
                    .userPhone(userPhone)
                    .userType(provider)
                    .build();
            userRepository.save(user);
        }

        return new SecurityDetails(user, oauth2User.getAttributes());
    }
}