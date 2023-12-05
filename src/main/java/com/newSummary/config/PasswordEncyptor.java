package com.newSummary.config;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.context.annotation.Configuration;

@Configuration
public class PasswordEncyptor {
		
	public static String encryptPassword(String password) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-384");
			
			md.update(password.getBytes());
			byte byteData[] = md.digest();
			
			StringBuilder sb = new StringBuilder();
			for(int i =0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) +0x100, 16).substring(1));
			}
			return sb.toString();
		}catch(NoSuchAlgorithmException e){
			throw new RuntimeException(e);
		}
		
	}
}
