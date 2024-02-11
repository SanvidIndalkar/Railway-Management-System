package com.app.service;

import java.util.List;

import com.app.dto.BookingPassengersDTO;
import com.app.dto.PassengerDTO;
import com.app.entities.Passenger;

public interface BookingService {

String bookTrain(Long trainId, BookingPassengersDTO bookingDTO);

List<PassengerDTO> bookingDetailsOfTrain(Long trainId);

}