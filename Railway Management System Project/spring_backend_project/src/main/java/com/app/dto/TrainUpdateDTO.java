package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.app.entities.Admin;
import com.app.entities.Station;

public class TrainUpdateDTO {

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
    private List<StopDTO> stops;
    private List<TrainClassesDTO> trainClasses;
}
