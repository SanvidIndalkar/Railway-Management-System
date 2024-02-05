package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AdminDao;
import com.app.dao.TrainDao;
import com.app.entities.Admin;
import com.app.entities.Train;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private TrainDao trainDao;
	
	@Override
	public Admin findByEmailAndPassword(Admin admin) {	
		return adminDao.findByEmailAndPassword(admin.getEmail(), admin.getPassword());
	}

	//to be done
	@Override
	public List<Train> findAllTrains() {
		return trainDao.findAll();
	}

		
}
