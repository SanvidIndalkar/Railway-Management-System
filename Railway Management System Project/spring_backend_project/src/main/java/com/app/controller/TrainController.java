package com.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomResponse;
import com.app.dto.StopDTO;
import com.app.dto.TrainClassesDTO;
import com.app.dto.TrainDTO;
import com.app.dto.TrainEditDTO;
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
    
    // Add Train
    @PostMapping("/add")
    public ResponseEntity<?> addTrain(@RequestBody TrainDTO trainDTO) {
        Train train = trainService.addNewTrain(trainDTO);
        if (train == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            		.body(new CustomResponse<>(true, "Something went wrong...", null));
        }
        return ResponseEntity.status(HttpStatus.CREATED)
        		.body(new CustomResponse<>(false, "Train Added Succesfully!", null));
    }
    
    // Get all trains
    @GetMapping("/allTrains")
    public ResponseEntity<?> getAllTrains() {
        List<TrainOnlyDTO> trains = trainService.findAllTrains();
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, "Success!", trains));
    }
    
    // Get all trains by admin
    @GetMapping("admin/allTrain/{adminId}")
    public ResponseEntity<?> getAllTrainsByAdmin(@PathVariable Long adminId) {
        List<TrainOnlyDTO> trains = trainService.getAllTrainsByAdmin(adminId);
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, "Success!", trains));
    }
    
    // Find train by Train Number
    @GetMapping("/number/{trainNumber}")
    public ResponseEntity<?> findTrainByNumber(@PathVariable Long trainNumber) {
        TrainOnlyDTO train = trainService.findTrainByNumber(trainNumber);
        if (train == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse<>(true, "Train not found!", null));
        }
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, "Success!", train));
    }
    
    // Find train by Train Name
    @GetMapping("/name/{trainName}")
    public ResponseEntity<?> findTrainByName(@PathVariable String trainName) {
        TrainOnlyDTO train = trainService.findTrainByName(trainName);
        if (train == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse<>(true, "Train not found!", null));
        }
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, "Success!", train));
    }
    
    @PutMapping("/editTrain/{trainId}")
    public ResponseEntity<?> editTrain(@PathVariable Long trainId, @RequestBody TrainEditDTO trainEditDTO){
    	boolean done = trainService.editTrain(trainId, trainEditDTO);
    	if(done) {
    		return ResponseEntity.status(HttpStatus.OK)
            		.body(new CustomResponse<>(false, "Successfully Edited Train Info!", null));
    	}
    	return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(true, "Editing Train Failed!", null));
    }
    
    // Reschedule a train by Train Number
    @PutMapping("/reschedule")
    public ResponseEntity<?> rescheduleTrain(@RequestBody TrainRescheduleDTO trainRescheduleDTO) {
        String message = trainService.rescheduleTrain(trainRescheduleDTO);
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, message, null));
    }
    
    // Search trains from one stop to another stop
    @PostMapping("/searchTrain/startAndStop")
    public ResponseEntity<?> findTrainsByTwoStopsInSequence(@RequestBody TrainSrcDestDateDTO searchInfo) {
        List<TrainDTO> trains = trainService.findTrainsByTwoStopsInSequence(searchInfo);
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, "Sucess!", trains));
    }
    
    // Find train by source and destination and date
    @PostMapping("/searchTrain")
    public ResponseEntity<?> findTrainBySourceDestinationDate(@RequestBody TrainSrcDestDateDTO srcDestDate) {
        List<TrainDTO> trains = trainService.findTrainBySourceDestinationDate(srcDestDate);
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, "Sucess!", trains));
    }
    
    // Find train by ID with all details
    @GetMapping("/searchTrainAllDetails/{trainId}")
    public ResponseEntity<?> findTrainAllDetails(@PathVariable Long trainId) {
        TrainDTO trainDTO = trainService.findTrainById(trainId);
        if (trainDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
            		.body(new CustomResponse<>(true, "Something went wrong...!", null));
        }
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, "Sucess!", trainDTO));
    }
    
    // Find train details by ID
    @GetMapping("/findTrainById/{trainId}")
    public ResponseEntity<?> findTrainDetailsById(@PathVariable Long trainId) {
        TrainDTO trainDTO = trainService.findTrainById(trainId);
        if (trainDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
            		.body(new CustomResponse<>(true, "Train not found!", null));
        }
        return ResponseEntity.status(HttpStatus.OK)
        		.body(new CustomResponse<>(false, "Sucess!", trainDTO));
    }
}
