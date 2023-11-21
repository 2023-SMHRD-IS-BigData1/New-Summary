package com.newSummary.config.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.newSummary.domain.entity.User;

import lombok.Data;

@Data
public class SecurityDetails implements UserDetails, OAuth2User {

    // 일반 로그인
    private final User user;

    // OAuth 로그인 (Google)
    private Map<String, Object> attributes;

    public SecurityDetails(User user){
        this.user = user;
    }

    public SecurityDetails(User user, Map<String, Object> attributes){
        this.user = user;
        this.attributes = attributes;
    }

    public User getUser(){
        return user;
    }
    
    // 밑에 코드들은 모두 override
	@Override
	public  Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public String getName() {
		return user.getUserEmail() +"";
	}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return user.getUserRole().toString();
            }
        });
        return roles;
    }

    @Override
    public String getPassword() {

        return user.getUserPw();
    }

    @Override
    public String getUsername() {

        return user.getUserEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}