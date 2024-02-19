package com.app.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.entities.User;
import com.app.enums.UserRole;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private TesingEmailService emailSender;
	
	@Autowired
	private PasswordEncoder enc;
	
	@Autowired
	private UserDao userDao;
	
	private final Map<String, ResetToken> resetTokenMap = new HashMap<>(); // Map to store reset tokens

	@Override
	public User addUser(User user) {
		user.setRole(UserRole.ROLE_USER);
		return userDao.save(user);
	}

	@Override
	public User findByEmailAndPasswordAndRole(User user, UserRole userRole) {
		return userDao.findByEmailAndPasswordAndRole(user.getEmail(), user.getPassword(), userRole);
	}

	@Override
	public User findByEmail(User user) {
		return userDao.findByEmailAndRole(user.getEmail(), UserRole.ROLE_USER);
	}

// Method to generate a random OTP
	private String generateOTP() {

// For simplicity, using a static OTP
		return "123456";
	}

	@Override
	public Optional<User> findByEmail(String email) {
		return userDao.findByEmail(email);
	}
	
	@Override
	public void processForgotPassword(String email) {
        // Generate and save reset token
        User user = userDao.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("No user with given email found!"));
        if (user != null) {
        	String resetToken = UUID.randomUUID().toString();
            LocalDateTime creationTime = LocalDateTime.now();

            // Store reset token with creation time in memory with email as key
            resetTokenMap.put(email, new ResetToken(resetToken, creationTime));

            // Send email with reset link
            emailSender.sendEmail(email, "Reset Password","Your token for resetting password :" +resetToken + " Will Expire in 5 minutes!");
        }
    }
	
	@Override
	public void processResetPassword(String email, String token, String newPassword) {
        // Retrieve reset token from map
        ResetToken resetToken = resetTokenMap.get(email);
        User user = userDao.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Email not found!"));
        if (resetToken != null && resetToken.getToken().equals(token)) {
            // Check if token is expired
            LocalDateTime currentTime = LocalDateTime.now();
            LocalDateTime expirationTime = resetToken.getCreationTime().plusMinutes(5); // 5 minutes expiration time
            if (currentTime.isBefore(expirationTime)) {
                // Reset password and remove token from memory
            	user.setPassword(enc.encode(newPassword));
            	userDao.save(user);
                resetTokenMap.remove(email);
            } else {
                // Handle expired token
            	throw new RuntimeException("Token expired!");
            }
        } else {
        	throw new RuntimeException("Token invalid!");
            // Handle invalid token
        }
    }
	private static class ResetToken {
        private final String token;
        private final LocalDateTime creationTime;

        public ResetToken(String token, LocalDateTime creationTime) {
            this.token = token;
            this.creationTime = creationTime;
        }

        public String getToken() {
            return token;
        }

        public LocalDateTime getCreationTime() {
            return creationTime;
        }
    }


}
