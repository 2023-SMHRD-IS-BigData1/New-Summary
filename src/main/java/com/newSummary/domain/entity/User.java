package com.newSummary.domain.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.newSummary.domain.UserRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access= AccessLevel.PROTECTED) 
@AllArgsConstructor
@Table(name="tb_user")
public class User {

    @Id
    @Column(length = 40)
    private String userEmail;
    
    @Column(length = 96,nullable = false)
    private String userPw;
    
    // OAuth 로그인에 사용
    @Column(length=10)
    private String userType; //일반, 구글, 카카오, 네이버, 깃허브

    @Column(length = 40)
    private String userName;

    @Column(length = 20, unique = true)
    private String userPhone;
    
    @CreationTimestamp
    @Column(updatable = false, columnDefinition = "DATETIME")
    private LocalDateTime joinedAt;

    // 회원 프로필
    @Column(length=1200)
    private String userProfile;


    @Enumerated(EnumType.STRING)
    private UserRole userRole; // 회원 권한 일반유저(U), 관리자(A)
    
    @Column(length=300)
    private String userToken;
    
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Point point;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Board> boards;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Bookmark> bookmarks;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<NewsLog> newsLogs;
    

    

}
    
    
    