package com.app.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserDao;
import com.app.entities.User;
import com.app.enums.UserRole;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

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

}
