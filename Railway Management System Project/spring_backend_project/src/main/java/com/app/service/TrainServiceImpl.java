package com.app.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AdminDao;
import com.app.dao.SeatAvailabiltyDao;
import com.app.dao.SeatDao;
import com.app.dao.StationDao;
import com.app.dao.TrainClassesDao;
import com.app.dao.TrainDao;
import com.app.dto.StopDTO;
import com.app.dto.TrainClassesDTO;
import com.app.dto.TrainDTO;
import com.app.dto.TrainOnlyDTO;
import com.app.dto.TrainRescheduleDTO;
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
	
	@Autowired
	private SeatDao seatDao;
	
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
	    List<TrainClasses> trainClasses = new ArrayList<TrainClasses>();
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
	            seats.add(seat);
	            allSeats.add(seat);
	        }
	        trainClass.setSeats(seats);
	        trainClasses.add(trainClass);
	    }
	    train.setTrainClasses(trainClasses);

	    Train savedTrain = trainDao.save(train);

	    savedTrain.getTrainClasses().size();
	    savedTrain.getStops().size();
	    
	    
	    System.out.println("Saved Train : " + savedTrain);
	    // Finally, save SeatAvailability entities
	    for(TrainClasses classes : savedTrain.getTrainClasses()) {
	    	classes.getSeats().size();
	    	List<Seat> allPersistSeats = classes.getSeats();
	    	for (Seat seat : allPersistSeats) {
	    		for (Stop stop : savedTrain.getStops()) {
	    			// Create SeatAvailability instances and associate with Stops
	    			SeatAvailability seatAvail = new SeatAvailability(seat, stop);
	    			seatAvailabilityDao.save(seatAvail);
	    		}
	    	}
	    }
	    return train;
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



	@Override
	public List<TrainDTO> findTrainsByTwoStopsInSequence(TrainSrcDestDateDTO searchInfo) {
		
		List<TrainDTO> matchingTrains = new ArrayList<TrainDTO>();
		List<Train> trainsByDate = trainDao.findBySourceDepartureDate(searchInfo.getJourneyDate());
		System.out.println("Trains : " + trainsByDate.size());
		
		for(Train trainByDate : trainsByDate) {
			trainByDate.getStops().size();
			List<Stop> stops = trainByDate.getStops();
			Collections.sort(stops);
			
			int sourceIndex = -1;
	        int destinationIndex = -1;
			
			// Find the indices of source and destination stations in the sorted stops list
	        for (int i = 0; i < stops.size(); i++) {
	            Stop stop = stops.get(i);
	            if (stop.getStation().getId().equals(searchInfo.getSource().getId())) {
	                sourceIndex = i;
	            } else if (stop.getStation().getId().equals(searchInfo.getDestination().getId())) {
	                destinationIndex = i;
	            }
	        }

	        // Ensure source station appears before destination station
	        if (sourceIndex != -1 && destinationIndex != -1 && sourceIndex < destinationIndex) {
	            // Match found, add train to the result
	            matchingTrains.add(convertTrainToTrainDTO(trainByDate));
	        }
	        else if(destinationIndex != -1 && sourceIndex == -1 && trainByDate.getSource().getId().equals(searchInfo.getSource().getId())) {
	        	matchingTrains.add(convertTrainToTrainDTO(trainByDate));	        	
	        }
	        else if(destinationIndex == -1 && sourceIndex != -1 && trainByDate.getDestination().getId().equals(searchInfo.getDestination().getId())) {
	        	matchingTrains.add(convertTrainToTrainDTO(trainByDate));	        	
	        }
		}
		return matchingTrains;
	}

	//converting Train into TrainDTO
	public TrainDTO convertTrainToTrainDTO(Train train) {
		
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
		return null;
	}


	@Override
	public String reschuduleTrain(TrainRescheduleDTO trainRescheduleDTO) {
		LocalDate sourceDepartureDate = trainRescheduleDTO.getSourceDepartureDate();
	    LocalDate destinationArrivalDate = trainRescheduleDTO.getDestinationArrivalDate();
	    LocalTime sourceDepartureTime = trainRescheduleDTO.getSourceDepartureTime(); 
	    LocalTime destinationArrivalTime = trainRescheduleDTO.getDestinationArrivalTime();
	    
	    Train train = trainDao.findById(trainRescheduleDTO.getId()).orElseThrow();
	    train.setSourceDepartureDate(sourceDepartureDate);
	    train.setDestinationArrivalDate(destinationArrivalDate);
	    train.setSourceDepartureTime(sourceDepartureTime);
	    train.setDestinationArrivalTime(destinationArrivalTime);
	    
	    trainDao.save(train);
		return "train rescheduled successfully";
	}
	
	
	
	
}
