package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookingPassengersDTO;
import com.app.entities.Passenger;
import com.app.service.BookingService;

@RestController
@RequestMapping("/booking")
public class BookingController {

	@Autowired 
	private BookingService bookingService;
	
	//for user
	//pending
	//book a train by sending list of passengers Details and trainID class
	@PostMapping("/passengers/{trainId}")
	public String bookTrainWithPassengers(@PathVariable Long trainId, @RequestBody BookingPassengersDTO bookingDTO){
		
		String message = bookingService.bookTrain(trainId, bookingDTO);
		
		return message;
	}
	
	//getting booking details of a particular train
	
	
	//getting all passengers of a particular booking id
	
	
}
