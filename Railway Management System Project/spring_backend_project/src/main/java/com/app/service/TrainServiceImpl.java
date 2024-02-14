package com.app.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
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
import com.app.enums.TrainStatus;

import ch.qos.logback.core.joran.util.beans.BeanUtil;

@Service
@Transactional
public class TrainServiceImpl implements TrainService {

	@Autowired
	private TesingEmailService emailSender;

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
	public Train addNewTrain(TrainDTO trainDTO) {

// 1) Check if train with same train number exists
		Train train = trainDao.findByTrainNumber(trainDTO.getTrainNumber());

// 2) If true then throw error
		if (train != null)
			throw new ResourceNotFoundException("Train with given train number already exists!");

// 3) Else call addTrain
		return addTrain(trainDTO);
	}

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
		for (TrainClasses classes : savedTrain.getTrainClasses()) {
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
		emailSender.sendEmail("sanvidmindalkar@gmail.com", "Tesint purposes", "Getting Trains Now");
// List<Train> trains = trainDao.findAll();
		return trainDao.findAll().stream().map((train) -> mapper.map(train, TrainOnlyDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<TrainDTO> findTrainBySourceDestinationDate(TrainSrcDestDateDTO srcDestDate) {
		Station source = mapper.map(srcDestDate.getSource(), Station.class);
		Station destination = mapper.map(srcDestDate.getDestination(), Station.class);
		LocalDate sourceDepartureDate = srcDestDate.getJourneyDate();
		List<Train> trains = trainDao.findBySourceAndDestinationAndSourceDepartureDate(source, destination,
				sourceDepartureDate);

		List<TrainDTO> trainsDTO = new ArrayList<TrainDTO>();

		for (Train train : trains) {
			if (train != null) {
				TrainDTO trainDTO = mapper.map(train, TrainDTO.class);
				train.getStops().size();
				train.getTrainClasses().size();

// Map stops to StopDTO
				List<StopDTO> stopDTOList = train.getStops().stream().map(stop -> mapper.map(stop, StopDTO.class))
						.collect(Collectors.toList());
				trainDTO.setStops(stopDTOList);

// Map train classes to TrainClassesDTO
				List<TrainClassesDTO> trainClassesDTOList = train.getTrainClasses().stream()
						.map(trainClass -> mapper.map(trainClass, TrainClassesDTO.class)).collect(Collectors.toList());
				trainDTO.setTrainClasses(trainClassesDTOList);
				trainsDTO.add(trainDTO);
			}
		}

		return trainsDTO;
	}

	@Override
	public TrainDTO findTrainById(Long trainId) {
		Optional<Train> optionalTrain = trainDao.findById(trainId);
		if (optionalTrain.isPresent()) {
			Train train = optionalTrain.get();
// Initialize the lazy-loaded collections within a transactional context

			if (train != null) {
				TrainDTO trainDTO = mapper.map(train, TrainDTO.class);
				train.getStops().size();
				train.getTrainClasses().size();

// Map stops to StopDTO
				List<StopDTO> stopDTOList = train.getStops().stream().map(stop -> mapper.map(stop, StopDTO.class))
						.collect(Collectors.toList());
				trainDTO.setStops(stopDTOList);

// Map train classes to TrainClassesDTO
				List<TrainClassesDTO> trainClassesDTOList = train.getTrainClasses().stream()
						.map(trainClass -> mapper.map(trainClass, TrainClassesDTO.class)).collect(Collectors.toList());
				trainDTO.setTrainClasses(trainClassesDTOList);
				return trainDTO;
			}
		}
		return null;
	}

	@Override
	public List<TrainOnlyDTO> getAllTrainsByAdmin(Long adminId) {

		Optional<Admin> adminOptional = adminDao.findById(adminId);
		if (adminOptional.isPresent()) {
			Admin admin = adminOptional.get();
			List<Train> trains = trainDao.findByAdmin(admin);
			return trains.stream().map((train) -> mapper.map(train, TrainOnlyDTO.class)).collect(Collectors.toList());
		}
		return null;
	}

	@Override
	public List<TrainDTO> findTrainsByTwoStopsInSequence(TrainSrcDestDateDTO searchInfo) {

		List<TrainDTO> matchingTrains = new ArrayList<TrainDTO>();
		List<Train> trainsByDate = trainDao.findBySourceDepartureDateAndTrainStatus(searchInfo.getJourneyDate(),
				TrainStatus.PENDING);

		System.out.println("Trains : " + trainsByDate.size());

		for (Train trainByDate : trainsByDate) {
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
			} else if (destinationIndex != -1 && sourceIndex == -1
					&& trainByDate.getSource().getId().equals(searchInfo.getSource().getId())) {
				matchingTrains.add(convertTrainToTrainDTO(trainByDate));
			} else if (destinationIndex == -1 && sourceIndex != -1
					&& trainByDate.getDestination().getId().equals(searchInfo.getDestination().getId())) {
				matchingTrains.add(convertTrainToTrainDTO(trainByDate));
			}
		}
		return matchingTrains;
	}

// converting Train into TrainDTO
	public TrainDTO convertTrainToTrainDTO(Train train) {

		if (train != null) {
			TrainDTO trainDTO = mapper.map(train, TrainDTO.class);
			train.getStops().size();
			train.getTrainClasses().size();

// Map stops to StopDTO
			List<StopDTO> stopDTOList = train.getStops().stream().map(stop -> mapper.map(stop, StopDTO.class))
					.collect(Collectors.toList());
			trainDTO.setStops(stopDTOList);

// Map train classes to TrainClassesDTO
			List<TrainClassesDTO> trainClassesDTOList = train.getTrainClasses().stream()
					.map(trainClass -> mapper.map(trainClass, TrainClassesDTO.class)).collect(Collectors.toList());
			trainDTO.setTrainClasses(trainClassesDTOList);
			return trainDTO;
		}
		return null;
	}

	@Override
	public String rescheduleTrain(TrainRescheduleDTO trainRescheduleDTO) {

// 1) Get All Trains By Train Number(Maybe orderby query)
// 2) Get the latest scheduled train
		Long trainNumber = trainRescheduleDTO.getTrainNumber();
		Train lastScheduledTrain = trainDao.findFirstByTrainNumberOrderBySourceDepartureDateDesc(trainNumber);
		if (lastScheduledTrain == null)
			throw new ResourceNotFoundException("No train with given train Number to Reschedule");

// 3) Check if the date of the train to be rescheduled is atleast
// 2 days after latest scheduled train's journey ending
		Period difference = Period.between(lastScheduledTrain.getSourceDepartureDate(),
				trainRescheduleDTO.getSourceDepartureDate());

// Get the total number of days in the difference
		long daysDifference = difference.getDays();

// Check if the difference is at least 2 days
		boolean okToReschedule = daysDifference >= 2;

// 4) Else Throw Error
		if (!okToReschedule)
			throw new RuntimeException("Train Needs to have gap of 2 days before rescheduling");

// 5) If OK create train and set dto value into train
		Train transientTrain = new Train();
		List<Stop> transientStops = new ArrayList<Stop>();
		List<TrainClasses> transientTrainClasses = new ArrayList<TrainClasses>();

// 6) Copy all data from lastScheduleTrain to transientTrain except ID stops and
// seats
		BeanUtils.copyProperties(lastScheduledTrain, transientTrain, "id");
		transientTrain.setDestinationArrivalDate(trainRescheduleDTO.getDestinationArrivalDate());
		transientTrain.setSourceDepartureDate(trainRescheduleDTO.getSourceDepartureDate());

// 7) Initializing stops and train classes
		lastScheduledTrain.getStops().size();
		lastScheduledTrain.getTrainClasses().size();

		List<Stop> lastScheduledTrainStops = lastScheduledTrain.getStops();
		List<TrainClasses> lastScheduledTrainClasses = lastScheduledTrain.getTrainClasses();

// 8) Copying stops into transient train's stop

		for (Stop stop : lastScheduledTrainStops) {
			Stop transientStop = new Stop();
			transientStop.setArrivalDate(stop.getArrivalDate());
			transientStop.setArrivalTime(stop.getArrivalTime());
			transientStop.setDepartureTime(stop.getDepartureTime());
			transientStop.setSequence(stop.getSequence());
			transientStop.setStation(stop.getStation());
			transientStop.setTrain(transientTrain);
			transientStops.add(transientStop);
		}

// 9) Copying train classes into transient train's classes
		List<Seat> allSeats = new ArrayList<Seat>();
		for (TrainClasses trainClass : lastScheduledTrainClasses) {
			TrainClasses transientTrainClass = new TrainClasses();
			transientTrainClass.setName(trainClass.getName());
			transientTrainClass.setTotalSeats(trainClass.getTotalSeats());
			transientTrainClass.setTrain(transientTrain);
			List<Seat> seats = new ArrayList<>();
			int totalSeats = trainClass.getTotalSeats();

			for (int i = 1; i <= totalSeats; i++) {
				Seat seat = new Seat();
				seat.setSeatNumber(i);
				seat.setTrainClass(transientTrainClass);
				seats.add(seat);
				allSeats.add(seat);
			}
			transientTrainClass.setSeats(seats);
			transientTrainClasses.add(transientTrainClass);
		}

// 10) set transient train classes and stops
		transientTrain.setStops(transientStops);
		transientTrain.setTrainClasses(transientTrainClasses);

		Train savedTrain = trainDao.save(transientTrain);

// 11) creating seat availability for saved train

		savedTrain.getTrainClasses().size();
		savedTrain.getStops().size();

		System.out.println("Saved Train : " + savedTrain);
// Finally, save SeatAvailability entities
		for (TrainClasses classes : savedTrain.getTrainClasses()) {
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

		return "train rescheduled successfully";
	}

// Runs every 60 seconds to update Train Status
	@Scheduled(fixedDelay = 60000)
	public void updateTrainStatus() {
		List<Train> trains = trainDao.findAll();
		LocalDate currentDate = LocalDate.now();
		LocalTime currentTime = LocalTime.now();

		for (Train train : trains) {
			if (train.getTrainStatus() == TrainStatus.CANCELLED || train.getTrainStatus() == TrainStatus.COMPLETED) {
				continue; // Skip updating status if already cancelled or completed
			}

			TrainStatus status = calculateTrainStatus(train, currentDate, currentTime);
			train.setTrainStatus(status);
			trainDao.save(train);
		}
	}

	private TrainStatus calculateTrainStatus(Train train, LocalDate currentDate, LocalTime currentTime) {

// Logic to determine the train status based on current date and time
		LocalDate sourceDate = train.getSourceDepartureDate();
		LocalTime sourceTime = train.getSourceDepartureTime();
		LocalDate destinationDate = train.getDestinationArrivalDate();
		LocalTime destinationTime = train.getDestinationArrivalTime();

		if (currentDate.isBefore(sourceDate) || (currentDate.equals(sourceDate) && currentTime.isBefore(sourceTime))) {
			return TrainStatus.PENDING;
		} else if ((currentDate.isEqual(sourceDate) && currentTime.isAfter(sourceTime))
				&& (currentDate.isBefore(destinationDate)
						|| (currentDate.isEqual(destinationDate) && currentTime.isBefore(destinationTime)))) {
			return TrainStatus.RUNNING;
		} else {
			return TrainStatus.COMPLETED;
		}
	}

}
