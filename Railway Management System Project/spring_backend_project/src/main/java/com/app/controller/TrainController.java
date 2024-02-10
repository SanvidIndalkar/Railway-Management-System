package com.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.StopDTO;
import com.app.dto.TrainClassesDTO;
import com.app.dto.TrainDTO;
import com.app.dto.TrainOnlyDTO;
import com.app.dto.TrainRescheduleDTO;
import com.app.dto.TrainSrcDestDateDTO;
import com.app.entities.Train;
import com.app.service.TrainService;

@RestController
@RequestMapping("/trains")
public class TrainController {
	
	@Autowired
	private TrainService trainService;
	
	@Autowired
	private ModelMapper mapper;
	
	//for admin
	//done
	//adding a train/scheduling a train
	@PostMapping("/add")
	public String addTrain(@RequestBody TrainDTO trainDTO) {
		
		Train train = trainService.addNewTrain(trainDTO);
		if(train == null) return "Failed";
		return "Success";
	}
	
	
	//for admin
	//done
	//finding all the trains
	@GetMapping("/allTrains")
	public List<TrainOnlyDTO> getAllTrains(){
		
		return trainService.findAllTrains();
	}
	
	
	//for admin
	//done
	//finding all trains of specific admin
	@GetMapping("admin/allTrain/{adminId}")
	public List<TrainOnlyDTO> getAllTrainsByAdmin(@PathVariable Long adminId){
		return trainService.getAllTrainsByAdmin(adminId);
	}
	
	
	//for admin
	//done
	//finding train by Train Number
	@GetMapping("/number/{trainNumber}")
	public TrainOnlyDTO findTrainByNumber(@PathVariable Long trainNumber) {
		
		TrainOnlyDTO train = trainService.findTrainByNumber(trainNumber);
		if(train == null) return null;
		return train;
	}

	
	//for admin
	//done
	//finding train by Train Name
	@GetMapping("/name/{trainName}")
	public TrainOnlyDTO findTrainByName(@PathVariable String trainName) {
		
		TrainOnlyDTO train = trainService.findTrainByName(trainName);
		if(train == null) return null;
		return train;
	}
	
	
	//for admin
	//done
	//reschedule a train by Train Number
	@PutMapping("/reschedule")
	public String rescheduleTrain(@RequestBody TrainRescheduleDTO trainRescheduleDTO) {

		String message = trainService.rescheduleTrain(trainRescheduleDTO);
		return message;
	}
	
	
	//for user
	//done
	//searching train from one stop to another stop
	@PostMapping("/searchTrain/startAndStop")
	public List<TrainDTO> findTrainsByTwoStopsInSequence(@RequestBody TrainSrcDestDateDTO searchInfo) {
		List<TrainDTO> trains = trainService.findTrainsByTwoStopsInSequence(searchInfo);
		return trains;
	}
	
	//for admin and user
	//done
	//find train by source and destination and date
	@PostMapping("/searchTrain")
	public List<TrainDTO> findTrainBySourceDestinationDate(@RequestBody TrainSrcDestDateDTO srcDestDate){
		List<TrainDTO> trains = trainService.findTrainBySourceDestinationDate(srcDestDate);
		return trains;
	}
	
	//for admin and user
	//done
	@GetMapping("/searchTrainAllDetails/{trainId}")
	public TrainDTO findTrainAllDetails(@PathVariable Long trainId) {
		TrainDTO trainDTO = trainService.findTrainById(trainId);
		return trainDTO;
	}
	
	
	
	//testing for Train as return type
	//pending
	@GetMapping("/findTrainById/{trainId}")
	public TrainDTO findTrainDetailsById(@PathVariable Long trainId) {
		TrainDTO trainDTO = trainService.findTrainById(trainId);
		return trainDTO;
	}

}
