package com.app.service;

import com.app.dto.BookingPassengersDTO;

public interface BookingService {

	String bookTrain(Long trainId, BookingPassengersDTO bookingDTO);
	
}
