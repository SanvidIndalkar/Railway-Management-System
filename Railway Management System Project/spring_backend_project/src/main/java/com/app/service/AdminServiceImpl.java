package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AdminDao;
import com.app.dao.TrainDao;
import com.app.entities.Train;
import com.app.entities.User;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminDao adminDao;
	
	@Override
	public User findByEmailAndPassword(User admin) {	
		return adminDao.findByEmailAndPassword(admin.getEmail(), admin.getPassword());
	}


		
}
