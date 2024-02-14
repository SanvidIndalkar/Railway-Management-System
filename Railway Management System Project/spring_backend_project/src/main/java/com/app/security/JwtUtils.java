package com.app.security;

import java.security.Key;

import javax.annotation.PostConstruct;
import javax.swing.JComboBox.KeySelectionManager;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.security.Keys;

public class JwtUtils {
	
	@Value("${SECRET_KEY}")
	private String jwtSecret;
	
	@Value("${EXP_TIMEOUT}")
	private int jwtExpritationMs;
	
	private Key key;
	
	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	public String generateJwtToken(Authentication authentication) {
		
		
		return "";
	}
	
}
