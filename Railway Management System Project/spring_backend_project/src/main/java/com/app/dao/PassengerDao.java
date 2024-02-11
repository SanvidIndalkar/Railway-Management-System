package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Passenger;
import com.app.entities.Train;

public interface PassengerDao extends JpaRepository<Passenger, Long>{


	List<Passenger> findByTrain(Train train);


}
