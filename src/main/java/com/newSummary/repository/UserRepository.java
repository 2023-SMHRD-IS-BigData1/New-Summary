package com.newSummary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.newSummary.domain.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	
	// 이메일로 회원정보 조회
	User findByUserEmail(String userEmail);
	
	 /* 유효성 검사 - 중복 체크
     * 중복 : true
     * 중복이 아닌 경우 : false
     */
	boolean existsByUserEmail(String userEmail); // 이메일
	
	// 회원 수
	@Query("SELECT COUNT(*) FROM User p WHERE p.userRole ='U'")
	Long countUser();
	
	// 관리자 수 
	@Query("SELECT COUNT(*) FROM User p WHERE p.userRole ='A'")
	Long countAdmin();
	
	void deleteById(String userEmail);
}
