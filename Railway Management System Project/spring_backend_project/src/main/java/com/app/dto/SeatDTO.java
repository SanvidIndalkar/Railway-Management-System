package com.app.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import com.app.entities.TrainClasses;

public class SeatDTO {
	
	private TrainClasses trainClass;
	

	private Integer seatNumber;
}
