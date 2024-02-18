package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookingDetailsPnrDTO;
import com.app.dto.BookingPassengersDTO;
import com.app.dto.CustomResponse;
import com.app.dto.PassengerDTO;
import com.app.service.BookingService;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/passengers/{trainId}")
    public ResponseEntity<?> bookTrainWithPassengers(@PathVariable Long trainId, @RequestBody BookingPassengersDTO bookingDTO) {
        Long pnr = bookingService.bookTrain(trainId, bookingDTO);
        if(pnr == null) {
        	throw new RuntimeException("Something went wrong...");
        }
        CustomResponse<Long> response = new CustomResponse<>(false, "success", pnr);
        return ResponseEntity.status(HttpStatus.OK)
        		.body(response);
    }

    @GetMapping("/bookings/{trainId}")
    public ResponseEntity<?> bookingDetailsOfTrain(@PathVariable Long trainId) {
        List<PassengerDTO> passengers = bookingService.bookingDetailsOfTrain(trainId);
        CustomResponse<List<PassengerDTO>> response = new CustomResponse<>(false, "success", passengers);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/booking/{pnr}")
    public ResponseEntity<?> passengerDetailsOfPNR(@PathVariable Long pnr) {
        List<BookingDetailsPnrDTO> bookingDetails = bookingService.bookingDetailsByPnr(pnr);
        CustomResponse<List<BookingDetailsPnrDTO>> response = new CustomResponse<>(false, "success", bookingDetails);
        return ResponseEntity.ok(response);
    }
}
