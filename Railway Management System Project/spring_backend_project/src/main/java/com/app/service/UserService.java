package com.app.service;

import com.app.entities.User;

public interface UserService {
	
	User addUser(User user);

	User findByEmailAndPassword(User user);

	User findByEmail(User user);
}
