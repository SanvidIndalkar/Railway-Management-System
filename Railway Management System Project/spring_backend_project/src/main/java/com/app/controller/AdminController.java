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
import com.app.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/login")
	public String login(@RequestBody User admin) {
		User adminFound = adminService.findByEmailAndPassword(admin);
		if(adminFound == null || adminFound.getRole() != UserRole.ROLE_ADMIN) return "No admin";
		return "Admin found";
	}
	
}
