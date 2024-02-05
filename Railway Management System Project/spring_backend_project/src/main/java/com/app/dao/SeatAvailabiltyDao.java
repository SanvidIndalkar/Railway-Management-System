package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.SeatAvailability;

public interface SeatAvailabiltyDao extends JpaRepository<SeatAvailability, Long>{

	
}
