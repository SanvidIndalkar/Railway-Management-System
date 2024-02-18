package com.app.service;

import java.util.List;

import com.app.dto.BookingDetailsPnrDTO;
import com.app.dto.BookingPassengersDTO;
import com.app.dto.PassengerDTO;
import com.app.entities.Passenger;

public interface BookingService {


	Long bookTrain(Long trainId, BookingPassengersDTO bookingDTO);

	List<PassengerDTO> bookingDetailsOfTrain(Long trainId);

	List<BookingDetailsPnrDTO> bookingDetailsByPnr(Long pnr);
	
}

