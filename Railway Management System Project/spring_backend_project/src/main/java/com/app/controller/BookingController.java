package com.app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/booking")
public class BookingController {

	//for user
	//pending
	//book a train by sending list of passengers Details and trainID class
	@GetMapping("/passengers")
	public String getPassengersList(){

		return "";
	}
	
	//getting booking details of a particular train
	
	
	//getting all passengers of a particular booking id
	
	
}
