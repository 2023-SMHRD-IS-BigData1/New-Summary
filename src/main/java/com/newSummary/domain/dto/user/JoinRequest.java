package com.newSummary.domain.dto.user;

import java.time.LocalDateTime;

import com.newSummary.domain.UserRole;
import com.newSummary.domain.entity.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequest {

    @NotBlank(message = "로그인 아이디가 비어있습니다.")
    private String userEmail;

    @NotBlank(message = "비밀번호가 비어있습니다.")
    private String userPw;
    private String passwordCheck;

    private String userName;
    
    private String userPhone;
    

    // 비밀번호 암호화 X
    public User toEntity() {
        return User.builder()
                .userEmail(this.userEmail)
                .userPw(this.userPw)
                .userName(this.userName)
                .userPhone(this.userPhone)
                .joinedAt(LocalDateTime.now())
                .userRole(UserRole.U)
                .build();
    }

    // 비밀번호 암호화
    public User toEntity(String encodedPassword) {
        return User.builder()
                .userEmail(this.userEmail)
                .userPw(encodedPassword)
                .userName(this.userName)
                .userPhone(this.userPhone)
                .joinedAt(LocalDateTime.now())
                .userRole(UserRole.U)
                .build();
    }
}
