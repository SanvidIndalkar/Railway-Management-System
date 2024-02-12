package com.app.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserDao;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Override
	public User addUser(User user) {
		return userDao.save(user);
	}

	@Override
	public User findByEmailAndPassword(User user) {
		return userDao.findByEmailAndPassword(user.getEmail(), user.getPassword());
	}

	@Override
	public User findByEmail(User user) {
		return userDao.findByEmail(user.getEmail());
	}

// Method to generate a random OTP
	private String generateOTP() {

// For simplicity, using a static OTP
		return "123456";
	}

}