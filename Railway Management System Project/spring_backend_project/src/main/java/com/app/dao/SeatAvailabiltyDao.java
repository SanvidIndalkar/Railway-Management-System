package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Seat;
import com.app.entities.SeatAvailability;
import com.app.entities.Stop;

public interface SeatAvailabiltyDao extends JpaRepository<SeatAvailability, Long>{

	SeatAvailability findByStopAndSeat(Stop stop, Seat seat);

	
}
