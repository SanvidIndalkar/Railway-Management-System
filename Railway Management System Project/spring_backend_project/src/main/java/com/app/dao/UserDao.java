package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;
import com.app.enums.UserRole;

public interface UserDao extends JpaRepository<User, Long>{


	User findByEmailAndRole(String email, UserRole roleUser);

	User findByEmailAndPasswordAndRole(String email, String password, UserRole roleUser);

	Optional<User> findByEmail(String username);

}
