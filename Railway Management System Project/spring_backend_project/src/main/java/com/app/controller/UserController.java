package com.app.controller;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CustomResponse;
import com.app.dto.LogIn;
import com.app.dto.ResetPasswordDto;
import com.app.dto.SigninResponse;
import com.app.entities.User;
import com.app.enums.UserRole;
import com.app.security.JwtUtils;
import com.app.service.TesingEmailService;
import com.app.service.UserService;
import com.app.utils.Pair;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
	

	private Map<String, Pair<String, Long>> otpMap = new ConcurrentHashMap<>();

	@Autowired
	private UserService userService;

	@Autowired
	private TesingEmailService emailSender;
	
	@Autowired
	private AuthenticationManager mgr;
	
	@Autowired
	private JwtUtils utils;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@GetMapping("/generateOTP")
	public ResponseEntity<?> generateOTP(@RequestParam String email) {
		boolean userPresent = userService.findByEmail(email).isPresent();
		if(userPresent) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<>(true,"Email already in use! Please login.", null ));
		}
			// Generate random OTP
		String otp = generateRandomOTP();

		// Store OTP with current timestamp
		otpMap.put(email, new Pair<>(otp, System.currentTimeMillis()));

		// Send email with OTP
		emailSender.sendEmail(email, "OTP Verification", "Your OTP for registration is " + otp);

		return ResponseEntity.status(HttpStatus.OK)
				.body(new CustomResponse<>(false, "OTP has been sent to your email.", null));
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
	public ResponseEntity<?> register(@RequestParam String otp,
			@RequestBody User user) {
		boolean userPresent = userService.findByEmail(user.getEmail()).isPresent();
		if(userPresent) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<>(true,"Email already in use! Please login.", null ));
		}
		// Retrieve OTP and its timestamp
		Pair<String, Long> otpPair = otpMap.get(user.getEmail());
		if (otpPair == null) {
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST)
					.body(new CustomResponse<>(true, "OTP not found or expired.", null));
		}

		// Compare OTPs
		if (otp.equals(otpPair.getFirst())) {
			// Check if OTP has expired (5 minutes)
			long currentTime = System.currentTimeMillis();
			if (currentTime - otpPair.getSecond() > 5 * 60 * 1000) {
				// Remove expired OTP from the map
				otpMap.remove(user.getEmail());
				return ResponseEntity
						.status(HttpStatus.BAD_REQUEST)
						.body(new CustomResponse<>(true, "OTP has expired.", null));
			}
			// OTP is valid, add the user
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userService.addUser(user);
			// Remove OTP from the map
			otpMap.remove(user.getEmail());
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(new CustomResponse<>(false, "OTP verification successful. User added successfully.", null));
		} else {
			// Invalid OTP
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST)
					.body(new CustomResponse<>(false, "Invalid OTP.", null));
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LogIn user) {
		System.out.println("Inside user login --");
		try {
			Authentication verifiedAuth = mgr
					.authenticate(new UsernamePasswordAuthenticationToken
							(user.getEmail(), user.getPassword()));
			

			User userFound = userService.findByEmail(user.getEmail())
					.orElseThrow(() -> new ResourceNotFoundException("No Email Found!"));
			if(userFound.getRole() != UserRole.ROLE_USER) throw new BadCredentialsException("Not a User!");
			SigninResponse resp = new SigninResponse(utils.generateJwtToken(verifiedAuth), userFound.getId()
					,userFound.getEmail(), userFound.getFirstName(), userFound.getLastName(),userFound.getRole()
					);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<>(false,"Login Successful",resp));

		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new CustomResponse<>(true, e.getMessage(), null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new CustomResponse<>(true, e.getMessage(), null));
//			.body("Something went wrong...login");
		}
	}
	
	@PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        userService.processForgotPassword(email);
        CustomResponse resp = new CustomResponse<>(false, "Success!", "Password reset link sent to your email.");
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
	
	@PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDto resetPassword) {
        userService.processResetPassword(resetPassword.getEmail(), resetPassword.getToken(), resetPassword.getNewPassword());
        CustomResponse resp = new CustomResponse<>(false, "Success!", "Password Reset Successful!");
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

}
