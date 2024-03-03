package com.app.dao;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import com.app.entities.Seat;
import com.app.entities.SeatAvailability;
import com.app.entities.Stop;

public interface SeatAvailabiltyDao extends JpaRepository<SeatAvailability, Long>{

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	SeatAvailability findByStopAndSeat(Stop stop, Seat seat);

	
}
