package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.TrainDTO;
import com.app.entities.Train;
import com.app.service.TrainService;

@RestController
@RequestMapping("/trains")
public class TrainController {
	
	@Autowired
	private TrainService trainService;
	
	@PostMapping("/add")
	public String addTrain(@RequestBody TrainDTO trainDTO) {
		
		trainService.addTrain(trainDTO);
		return "Request Received";
	}
	
	@GetMapping("/number/{trainNumber}")
	public String findTrainByNumber(@PathVariable Long trainNumber) {
		
		Train train = trainService.findTrainByNumber(trainNumber);
		if(train == null) return "train not found";
		return "train found";
	}

	@GetMapping("/name/{trainName}")
	public String findTrainByName(@PathVariable String trainName) {
		
		Train train = trainService.findTrainByName(trainName);
		if(train == null) return "train not found";
		return "train found by name";
	}
	
	@PutMapping("/update/{trainId}")
	public Train updateTrain(@PathVariable Long trainId, @RequestBody Train train) {
		return null;
	}

}
