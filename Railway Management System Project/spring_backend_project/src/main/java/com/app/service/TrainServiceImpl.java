package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AdminDao;
import com.app.dao.SeatAvailabiltyDao;
import com.app.dao.StationDao;
import com.app.dao.TrainClassesDao;
import com.app.dao.TrainDao;
import com.app.dto.StopDTO;
import com.app.dto.TrainClassesDTO;
import com.app.dto.TrainDTO;
import com.app.dto.TrainOnlyDTO;
import com.app.dto.TrainSrcDestDateDTO;
import com.app.entities.Admin;
import com.app.entities.Seat;
import com.app.entities.SeatAvailability;
import com.app.entities.Station;
import com.app.entities.Stop;
import com.app.entities.Train;
import com.app.entities.TrainClasses;

@Service
@Transactional
public class TrainServiceImpl implements TrainService{

	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private TrainDao trainDao;
	
	@Autowired
	private StationDao stationDao;
	
	@Autowired
	private SeatAvailabiltyDao seatAvailabilityDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private TrainClassesDao trainClassesDao;
	
	@Override
	public Train addTrain(TrainDTO trainDTO) {
		
		Train train = mapper.map(trainDTO, Train.class);

		    // Fetching stopDTO of TrainDTO
		List<StopDTO> stopsDTO = trainDTO.getStops();
	    List<Stop> stops = new ArrayList<>();

		    // Converting each StopDTO into Stop
	    for (StopDTO stopDTO : stopsDTO) {
	        Stop stop = mapper.map(stopDTO, Stop.class);

	        Long stationId = stopDTO.getStation().getId();
	        Station st = stationDao.findById(stationId).orElseThrow(() -> new RuntimeException("Station not found"));

	        stop.setStation(st);
	        stop.setTrain(train);
	        stops.add(stop);
	    }
	    train.setStops(stops);

		    // Fetching TrainClassesDTO from TrainDTO
	    List<TrainClassesDTO> trainClassesDTOs = trainDTO.getTrainClasses();
	    List<TrainClasses> trainClasses = new ArrayList<>();

		List<Seat> allSeats = new ArrayList<>();

	    for (TrainClassesDTO trainClassesDTO : trainClassesDTOs) {
	    	TrainClasses trainClass = mapper.map(trainClassesDTO, TrainClasses.class);
		    trainClass.setTrain(train);

		    List<Seat> seats = new ArrayList<>();
		    int totalSeats = trainClassesDTO.getTotalSeats();

		    for (int i = 1; i <= totalSeats; i++) {
		    	Seat seat = new Seat();
		    	seat.setSeatNumber(i);
		    	seat.setTrainClass(trainClass);
		    	allSeats.add(seat);
		    	seats.add(seat);
		        	}
		    trainClass.setSeats(seats);
		    trainClasses.add(trainClass);
	    }
	    train.setTrainClasses(trainClasses);
	    
	    Train savedTrain = trainDao.save(train);

	    // Persist TrainClasses entities first
	    for (TrainClasses trainClass : trainClasses) {
	    	trainClass.setTrain(savedTrain); // Set the Train reference
	    	trainClassesDao.save(trainClass); // Persist TrainClasses
	    }

	    // Then, save Seat entities
	    for (Seat seat : allSeats) {
	    	for (Stop stop : savedTrain.getStops()) {
	    		// Create SeatAvailability instances and associate with Stops
	    		SeatAvailability seatAvail = new SeatAvailability(seat, stop);
	    		seatAvailabilityDao.save(seatAvail);
	    	}
	    }

	    return savedTrain;
	}

	
	@Override
	public TrainOnlyDTO findTrainByNumber(Long trainNumber) {
		Train train = trainDao.findByTrainNumber(trainNumber);
		return mapper.map(train, TrainOnlyDTO.class);
	}


	@Override
	public TrainOnlyDTO findTrainByName(String trainName) {
		Train train = trainDao.findByTrainName(trainName);
		return mapper.map(train, TrainOnlyDTO.class);
	}
	

	@Override
	public List<TrainOnlyDTO> findAllTrains() {
//		 List<Train> trains = trainDao.findAll();
		 return trainDao.findAll().stream()
		 .map((train) -> mapper.map(train, TrainOnlyDTO.class))
		 .collect(Collectors.toList());
	}


	@Override
	public List<TrainDTO> findTrainBySourceDestinationDate(TrainSrcDestDateDTO srcDestDate) {
		Station source = mapper.map(srcDestDate.getSource(), Station.class);
		Station destination = mapper.map(srcDestDate.getDestination(), Station.class);
		LocalDate sourceDepartureDate = srcDestDate.getJourneyDate();
		List<Train> trains = trainDao.findBySourceAndDestinationAndSourceDepartureDate(source, destination, sourceDepartureDate);
		
		List<TrainDTO> trainsDTO = new ArrayList<TrainDTO>();
		
		for(Train train : trains) {
			if(train != null) {
	    		 TrainDTO trainDTO = mapper.map(train, TrainDTO.class);
	    		 train.getStops().size();
	    		 train.getTrainClasses().size();
	    		 

	    		 // Map stops to StopDTO
	    		 List<StopDTO> stopDTOList = train.getStops().stream()
	    		 .map(stop -> mapper.map(stop, StopDTO.class))
	    		 .collect(Collectors.toList());
	    		 trainDTO.setStops(stopDTOList);

	    		 // Map train classes to TrainClassesDTO
	    		 List<TrainClassesDTO> trainClassesDTOList = train.getTrainClasses().stream()
	    				 .map(trainClass -> mapper.map(trainClass, TrainClassesDTO.class))
	    				 .collect(Collectors.toList());
	    		 trainDTO.setTrainClasses(trainClassesDTOList);
	    		 trainsDTO.add(trainDTO);
	    	 }   
		}
		
		return trainsDTO;
	}


	@Override
	public TrainDTO findTrainById(Long trainId) {
		 Optional<Train> optionalTrain = trainDao.findById(trainId);
	     if(optionalTrain.isPresent()) {
	    	 Train train = optionalTrain.get();
	    	 // Initialize the lazy-loaded collections within a transactional context
	    	 
	    	 if(train != null) {
	    		 TrainDTO trainDTO = mapper.map(train, TrainDTO.class);
	    		 train.getStops().size();
	    		 train.getTrainClasses().size();
	    		 

	    		 // Map stops to StopDTO
	    		 List<StopDTO> stopDTOList = train.getStops().stream()
	    		 .map(stop -> mapper.map(stop, StopDTO.class))
	    		 .collect(Collectors.toList());
	    		 trainDTO.setStops(stopDTOList);

	    		 // Map train classes to TrainClassesDTO
	    		 List<TrainClassesDTO> trainClassesDTOList = train.getTrainClasses().stream()
	    				 .map(trainClass -> mapper.map(trainClass, TrainClassesDTO.class))
	    				 .collect(Collectors.toList());
	    		 trainDTO.setTrainClasses(trainClassesDTOList);
	    		 return trainDTO;
	    	 }   
	     } 
	     return null;
	}


	
	@Override
	public List<TrainOnlyDTO> getAllTrainsByAdmin(Long adminId) {
		
		Optional<Admin> adminOptional = adminDao.findById(adminId);
		if(adminOptional.isPresent()) {
			Admin admin = adminOptional.get();
			List<Train> trains = trainDao.findByAdmin(admin);
			return trains.stream()
					.map((train) -> mapper.map(train, TrainOnlyDTO.class))
					.collect(Collectors.toList());
		}
		return null;
	}

	
	
	
	
}
