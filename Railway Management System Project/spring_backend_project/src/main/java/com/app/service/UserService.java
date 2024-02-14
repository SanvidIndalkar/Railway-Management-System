package com.app.service;

import com.app.entities.User;
import com.app.enums.UserRole;

public interface UserService {
	
	User addUser(User user);

	User findByEmailAndPasswordAndRole(User user, UserRole userRole);

	User findByEmail(User user);

}
