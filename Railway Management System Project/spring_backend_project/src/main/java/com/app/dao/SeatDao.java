package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Seat;
import com.app.entities.TrainClasses;

public interface SeatDao extends JpaRepository<Seat, Long>{

	List<Seat> findByTrainClass(TrainClasses trainClass);
	
	
}
