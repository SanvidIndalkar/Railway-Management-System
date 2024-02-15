package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CustomResponse;
import com.app.dto.LogIn;
import com.app.dto.SigninResponse;
import com.app.entities.Train;
import com.app.entities.User;
import com.app.enums.UserRole;
import com.app.security.JwtUtils;
import com.app.service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationManager mgr;
	
	@Autowired
	private JwtUtils utils;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LogIn admin) {
		try {
			Authentication verifiedAuth = mgr
					.authenticate(new UsernamePasswordAuthenticationToken
							(admin.getEmail(), admin.getPassword()));
			User user = userService.findByEmail(admin.getEmail())
					.orElseThrow(() -> new ResourceNotFoundException("No Email Found!"));
			if(user.getRole() != UserRole.ROLE_ADMIN) throw new BadCredentialsException("Not a Admin!");
			return ResponseEntity
					.ok(new SigninResponse(utils.generateJwtToken(verifiedAuth), "Successful Authentication!!!"));

		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new CustomResponse<>(true, e.getMessage(), null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new CustomResponse<>(true, e.getMessage(), null));
		}
	}

}
