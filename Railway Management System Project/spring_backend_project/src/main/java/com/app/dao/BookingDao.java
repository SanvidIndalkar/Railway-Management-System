package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Booking;

public interface BookingDao extends JpaRepository<Booking, Long>{

	@Query("SELECT MAX(b.pnr) FROM Booking b")
	Long findMaxPnr();
	
}