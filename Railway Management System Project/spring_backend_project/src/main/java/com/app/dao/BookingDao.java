package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Booking;
import com.app.entities.Train;

public interface BookingDao extends JpaRepository<Booking, Long> {

	@Query("SELECT MAX(b.pnr) FROM Booking b")
	Long findMaxPnr();

	Booking findByPnr(Long pnr);

	List<Booking> findByTrain(Train train);

}