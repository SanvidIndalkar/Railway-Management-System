package com.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Admin;
import com.app.entities.Station;
import com.app.entities.Train;

public interface TrainDao extends JpaRepository<Train, Long>{

	Train findByTrainNumber(Long trainNumber);

	Train findByTrainName(String trainName);

	List<Train> findBySourceAndDestinationAndSourceDepartureDate(Station source, Station destination,
			LocalDate sourceDepartureDate);

	List<Train> findByAdmin(Admin admin);

	List<Train> findBySourceDepartureDate(LocalDate journeyDate);

	Train findFirstByTrainNumberOrderBySourceDepartureDateDesc(Long trainNumber);

	
}
