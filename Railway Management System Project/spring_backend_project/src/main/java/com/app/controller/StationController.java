package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.internal.CustomizerRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomResponse;
import com.app.dto.StationDTO;
import com.app.service.StationService;

@RestController
@RequestMapping("/stations")
public class StationController {

	@Autowired
	private StationService stationService;
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllStations(){
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(new CustomResponse<>(false, "success", stationService.findAll()));
	}
}
