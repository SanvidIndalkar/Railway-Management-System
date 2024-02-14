package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Train;
import com.app.entities.User;
import com.app.enums.UserRole;
import com.app.service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public String login(@RequestBody User admin) {
		User adminFound = userService.findByEmailAndPasswordAndRole(admin, UserRole.ROLE_ADMIN);
		if(adminFound == null || adminFound.getRole() != UserRole.ROLE_ADMIN) return "No admin";
		return "Admin found";
	}
	
}
