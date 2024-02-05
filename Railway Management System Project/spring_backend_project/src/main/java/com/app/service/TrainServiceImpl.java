package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.SeatAvailabiltyDao;
import com.app.dao.StationDao;
import com.app.dao.TrainDao;
import com.app.dto.StopDTO;
import com.app.dto.TrainClassesDTO;
import com.app.dto.TrainDTO;
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
	private TrainDao trainDao;
	
	@Autowired
	private StationDao stationDao;
	
	@Autowired
	private SeatAvailabiltyDao seatAvailabilityDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public Train addTrain(TrainDTO trainDTO) {
		
		Train train = mapper.map(trainDTO, Train.class);
		List<StopDTO> stopsDTO = trainDTO.getStops();
		List<Stop> stops = new ArrayList<Stop>();
		
		for (StopDTO stopDTO : stopsDTO) {
            Stop stop = mapper.map(stopDTO, Stop.class);
            
            Long stationId = stopDTO.getStationId();
            Station st = stationDao.findById(stationId).get();
            
            stop.setStation(st);
            stop.setTrain(train);
            stops.add(stop);
        }
        train.setStops(stops);
        
        List<TrainClassesDTO> trainClassesDTOs = trainDTO.getTrainClasses();
        List<TrainClasses> trainClasses = new ArrayList<>();
        
        List<Seat> allSeats = new ArrayList<Seat>();
        
        for (TrainClassesDTO trainClassesDTO : trainClassesDTOs) {
            TrainClasses trainClass = mapper.map(trainClassesDTO, TrainClasses.class);
            trainClass.setTrain(train);
            
            List<Seat> seats = new ArrayList<Seat>();
            int totalSeats = trainClassesDTO.getTotalSeats();
			
			for(int i = 1 ;i <= totalSeats; i++) {
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
        
        
        System.out.println("------00000000------");
        System.out.println(train.getStops());
        System.out.println(train.getTrainClasses());
		Train savedTrain = trainDao.save(train);
		for(Seat seat : allSeats) {
			for(Stop stop : train.getStops()) {
				SeatAvailability seatAvail = new SeatAvailability(seat,stop);
				seatAvailabilityDao.save(seatAvail);
			}
		}
		
		return savedTrain;
	}

	
	
	@Override
	public Train findTrainByNumber(Long trainNumber) {
		return trainDao.findByTrainNumber(trainNumber);
	}


	@Override
	public Train findTrainByName(String trainName) {

		return trainDao.findByTrainName(trainName);
	}

	
	
	
	
}
