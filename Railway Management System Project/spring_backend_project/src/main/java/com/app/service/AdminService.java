package com.app.service;

import java.util.List;

import com.app.entities.Admin;
import com.app.entities.Train;
import com.app.entities.User;

public interface AdminService {

	Admin findByEmailAndPassword(Admin admin);

	List<Train> findAllTrains();
	
}
