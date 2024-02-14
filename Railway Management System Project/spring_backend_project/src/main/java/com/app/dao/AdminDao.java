package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import com.app.entities.User;
import com.app.enums.UserRole;

public interface AdminDao extends JpaRepository<User, Long>{
	
	User findByEmailAndPasswordAndRole(String email, String password, UserRole userAdmin);
}
