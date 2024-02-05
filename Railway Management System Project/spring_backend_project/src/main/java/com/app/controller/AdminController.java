package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Admin;
import com.app.entities.Train;
import com.app.entities.User;
import com.app.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/login")
	public String login(@RequestBody Admin admin) {
		Admin adminFound = adminService.findByEmailAndPassword(admin);
		if(adminFound == null) return "No admin";
		return "Admin found";
	}
	
	@GetMapping("/allTrains")
	public List<Train> getAllTrains(){
		
		return adminService.findAllTrains();
	}
}
