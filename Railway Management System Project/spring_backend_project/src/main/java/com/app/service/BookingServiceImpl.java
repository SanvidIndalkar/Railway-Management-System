package com.app.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.BookingDao;
import com.app.dao.PassengerDao;
import com.app.dao.SeatAvailabiltyDao;
import com.app.dao.SeatDao;
import com.app.dao.TrainClassesDao;
import com.app.dao.TrainDao;
import com.app.dao.UserDao;
import com.app.dto.BookingPassengersDTO;
import com.app.dto.PassengerDTO;
import com.app.dto.StationDTO;
import com.app.entities.Booking;
import com.app.entities.Passenger;
import com.app.entities.Seat;
import com.app.entities.SeatAvailability;
import com.app.entities.Station;
import com.app.entities.Stop;
import com.app.entities.Train;
import com.app.entities.TrainClasses;
import com.app.entities.User;
import com.app.enums.Classes;

@Service
@Transactional
public class BookingServiceImpl implements BookingService{

@Autowired
private BookingDao bookingDao;

@Autowired
private ModelMapper mapper;

@Autowired
private TrainDao trainDao;

@Autowired
private UserDao userDao;

@Autowired
private SeatDao seatDao;

@Autowired
private SeatAvailabiltyDao seatAvailabilityDao;

@Autowired
private TrainClassesDao trainClassesDao;

@Autowired
private PassengerDao passengerDao;


//pending
@Override
public String bookTrain(Long trainId, BookingPassengersDTO bookingDTO) {

//0)Checking if totalPassengers and Passengers List in booking DTO is same
if(bookingDTO.getTotalPassengers() != bookingDTO.getPassengersDTO().size()) return "passengers total mismatch";

//1) Check If train exists -> Get Train
Train train = trainDao.findById(trainId).orElseThrow();

//2) Check If User exists -> Get User
User user = userDao.findById(bookingDTO.getUserId()).orElseThrow();

//3) Get Details From BookingPassengerDTO
int totalPassengers = bookingDTO.getTotalPassengers();
Station source = mapper.map(bookingDTO.getSource(), Station.class);
Station destination = mapper.map(bookingDTO.getDestination(), Station.class);
Classes trainClassEnum = bookingDTO.getTrainClass();

//4) Get The stops of the train and seats of that train's classes
train.getStops().size();
List<Stop> stops = train.getStops();
Collections.sort(stops);
TrainClasses trainClass = trainClassesDao.findByTrainAndName(train, trainClassEnum);
List<Seat> seats = seatDao.findByTrainClass(trainClass);

int sourceStopIndex = -1;
int destinationStopIndex = -1;
//5) Check if the source and destination of the passenger journey
//   is same as source of train and destination of train
if((train.getSource().getId() == source.getId()) && (train.getDestination().getId() == destination.getId())) {
//check for available seats from start to end
sourceStopIndex = 0;
destinationStopIndex = stops.size() - 1;

}
//OR
// Check if the source of the journey is same as train source
else if(train.getSource().getId() == source.getId()) {
sourceStopIndex = 0;
destinationStopIndex = findIndexForStop(destination, stops);
if(destinationStopIndex == -1) throw new RuntimeException("destination station not found");
}
//OR
// Check if the destination of the journey is same as train destination
else if(train.getDestination().getId() == destination.getId()) {
sourceStopIndex = findIndexForStop(source, stops);
destinationStopIndex = stops.size()-1;
if(sourceStopIndex == -1) throw new RuntimeException("source station not found");

}
//OR
else {
// Check if the source and destination exists in stop and indexes are
// sourceIndex < destinationIndex
sourceStopIndex = findIndexForStop(source, stops);
destinationStopIndex = findIndexForStop(destination, stops);
if(sourceStopIndex == -1 || destinationStopIndex == -1 || sourceStopIndex >= destinationStopIndex) throw new RuntimeException("something went wrong");
}
//OR
// throw error

//6) Check total number of seats available from source Stop to destination
//  Stop of Journey (all stop in between as well
// also add that seat Available in the list
List<Seat> availableSeats = checkSeatAvailability(stops, seats,sourceStopIndex, destinationStopIndex, totalPassengers);

//7) If total number of seats available is < total Passengers
if(availableSeats.size() < totalPassengers) return "Seats not available";
// Throw error

//8) Make the seat Availability as false and save update
//book seats
List<Seat> bookedSeats = bookSeats(totalPassengers,availableSeats,stops,sourceStopIndex,destinationStopIndex-1);
if(bookedSeats.size() != totalPassengers) return "something went wrong while booking seats";

//9) set passengers in to booking and set all booking fields
Booking booking = new Booking();
booking.setDestination(destination);
booking.setSource(source);
booking.setTotalPassengers(totalPassengers);
booking.setUser(user);
booking.setTrain(train);
List<Passenger> passengers = bookingDTO.getPassengersDTO().stream()
.map((passengerDTO) -> mapper.map(passengerDTO, Passenger.class))
.collect(Collectors.toList());

for(int i = 0; i < totalPassengers; i++) {
Passenger passenger = passengers.get(i);
passenger.setTrain(train);
passenger.setBooking(booking);
passenger.setSeat(bookedSeats.get(i));
passengers.set(i, passenger);
}

booking.setPassengers(passengers);
//setting PNR
Long latestPnr = bookingDao.findMaxPnr();
Long nextPnr = (latestPnr != null) ? latestPnr + 1 : 70000L;
booking.setPnr(nextPnr);
//10) save booking
Booking bookingSaved = bookingDao.save(booking);
if(bookingSaved == null) return "booking unsuccessfull";
return "booking successfull";
//bookingDTO
// private Long userId;
// private StationDTO source;
// private StationDTO destination;
//
// private Classes trainClass;
//
// private Integer totalPassengers;
//
// List<PassengerDTO> passengersDTO;
}

private List<Seat> bookSeats(int totalPassengers, List<Seat> availableSeats, List<Stop> stops, int sourceStopIndex,
int destinationStopIndex) {

List<Seat> bookedSeats = new ArrayList<Seat>();
int seatBooked = 0;
for(Seat availableSeat : availableSeats) {
if(totalPassengers == seatBooked) return bookedSeats;
for(int i = sourceStopIndex; i <= destinationStopIndex; i++) {
Stop currentStop = stops.get(i);
SeatAvailability seatAvailabilityStatus = seatAvailabilityDao.findByStopAndSeat(currentStop, availableSeat);
if(!seatAvailabilityStatus.getIsAvailable()) throw new RuntimeException("something went wrong while booking seats!!!");
seatAvailabilityStatus.setIsAvailable(false);
}
bookedSeats.add(availableSeat);
seatBooked++;
}
return bookedSeats;
}

private int findIndexForStop(Station source, List<Stop> stops) {
for(int i = 0; i < stops.size(); i++) {
if(stops.get(i).getStation().getId() == source.getId()) return i;
}
return -1;
}

private List<Seat> checkSeatAvailability(List<Stop> stops, List<Seat> seats, int sourceStopIndex, int destinationStopIndex, int totalPassengers) {

List<Seat> availableSeats = new ArrayList<Seat>();

for(Seat seat : seats) {
if(totalPassengers == availableSeats.size()) return availableSeats;
boolean seatAvailable = true;
for(int i = sourceStopIndex; i <= destinationStopIndex; i++) {
Stop currentStop = stops.get(i);
SeatAvailability seatAvailability = seatAvailabilityDao.findByStopAndSeat(currentStop, seat);
if(!seatAvailability.getIsAvailable()) {
seatAvailable = false;
}
}
if(seatAvailable) availableSeats.add(seat);
}
return availableSeats;
}

@Override
public List<PassengerDTO> bookingDetailsOfTrain(Long trainId) {

// 1) Find train with given Id
Train train = trainDao.findById(trainId).orElseThrow(() -> new ResourceNotFoundException("Train Not Found!"));

// 2) Find all passengers travelling by same train
List<Passenger> passengers = passengerDao.findByTrain(train);

List<PassengerDTO> passengersDto = passengers.stream().map((passenger) -> mapper.map(passenger, PassengerDTO.class)).collect(Collectors.toList());

return passengersDto;
}

}