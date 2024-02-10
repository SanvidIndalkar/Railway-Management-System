package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.app.entities.Admin;
import com.app.entities.Station;
import com.app.enums.TrainStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainOnlyDTO {
	
	private Long id;
	private Long trainNumber;
    private String trainName;
    private Admin admin;
    private Station source;
    private Station destination;
    private LocalDate sourceDepartureDate;
    private LocalDate destinationArrivalDate;
    private LocalTime sourceDepartureTime;
    private LocalTime destinationArrivalTime;
    private Integer totalStops;
    private TrainStatus trainStatus;
}
