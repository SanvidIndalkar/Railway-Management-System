package com.app.service;

import java.util.List;


import com.app.entities.Train;
import com.app.entities.User;

public interface AdminService {

	User findByEmailAndPassword(User admin);

	
}
