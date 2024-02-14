package com.app.controller;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.User;
import com.app.enums.UserRole;
import com.app.service.TesingEmailService;
import com.app.service.UserService;
import com.app.utils.Pair;

@RestController
@RequestMapping("/user")
public class UserController {

	private Map<String, Pair<String, Long>> otpMap = new ConcurrentHashMap<>();

	@Autowired
	private UserService userService;

	@Autowired
	private TesingEmailService emailSender;

	@GetMapping("/generateOTP")
	public ResponseEntity<String> generateOTP(@RequestParam String email) {
		// Generate random OTP
		String otp = generateRandomOTP();

		// Store OTP with current timestamp
		otpMap.put(email, new Pair<>(otp, System.currentTimeMillis()));

		// Send email with OTP
		emailSender.sendEmail(email, "OTP Verification", "Your OTP for registration is " + otp);

		return ResponseEntity.ok("OTP has been sent to your email.");
	}

	private String generateRandomOTP() {
		// Generate a random 6-digit OTP
		Random random = new Random();
		int otpDigits = 6;
		StringBuilder otpBuilder = new StringBuilder();
		for (int i = 0; i < otpDigits; i++) {
			otpBuilder.append(random.nextInt(10)); // Append a random digit (0-9)
		}
		return otpBuilder.toString();
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestParam String email, @RequestParam String otp,
			@RequestBody User user) {
		// Retrieve OTP and its timestamp
		Pair<String, Long> otpPair = otpMap.get(email);
		if (otpPair == null) {
			return ResponseEntity.badRequest().body("OTP not found or expired.");
		}

		// Compare OTPs
		if (otp.equals(otpPair.getFirst())) {
			// Check if OTP has expired (5 minutes)
			long currentTime = System.currentTimeMillis();
			if (currentTime - otpPair.getSecond() > 5 * 60 * 1000) {
				// Remove expired OTP from the map
				otpMap.remove(email);
				return ResponseEntity.badRequest().body("OTP has expired.");
			}
			// OTP is valid, add the user
			userService.addUser(user);
			// Remove OTP from the map
			otpMap.remove(email);
			return ResponseEntity.ok("OTP verification successful. User added successfully.");
		} else {
			// Invalid OTP
			return ResponseEntity.badRequest().body("Invalid OTP.");
		}
	}

	@PostMapping("/login")
	public String login(@RequestBody User user) {
		User userFound = userService.findByEmailAndPasswordAndRole(user, UserRole.ROLE_USER);
		if (userFound == null)
			return "No User";
		return "User found";
	}

}
