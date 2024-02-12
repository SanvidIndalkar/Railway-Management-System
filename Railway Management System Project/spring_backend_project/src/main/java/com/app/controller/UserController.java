package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.User;
import com.app.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public String registerUser(@RequestBody User user) {
		
		//email verification OTP
		
		User userFound = userService.findByEmail(user);
		if(userFound == null) {
			userService.addUser(user);
			return "User Added Succesfully";
		}
		return "Email Already in Use";
	}
	
	@PostMapping("/login")
	public String login(@RequestBody User user) {
		User userFound = userService.findByEmailAndPassword(user);
		if(userFound == null) return "No User";
		return "User found";
	}
	
}
