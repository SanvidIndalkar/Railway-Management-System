package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.Admin;
import com.app.entities.Station;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TrainRescheduleDTO {
	
	private Long trainNumber;
    private String trainName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate sourceDepartureDate;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate destinationArrivalDate;

}
