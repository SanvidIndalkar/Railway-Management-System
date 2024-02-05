package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Train;

public interface TrainDao extends JpaRepository<Train, Long>{

	Train findByTrainNumber(Long trainNumber);

	Train findByTrainName(String trainName);

	
}
