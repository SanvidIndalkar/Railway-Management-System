package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


import com.app.entities.Station;
import com.app.entities.Stop;
import com.app.entities.TrainClasses;
import com.app.entities.User;
import com.app.enums.TrainStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class TrainDTO {
	
	private Long id;
	private Long trainNumber;
    private String trainName;
    private User admin;
    private Station source;
    private Station destination;
    private LocalDate sourceDepartureDate;
    private LocalDate destinationArrivalDate;
    private LocalTime sourceDepartureTime;
    private LocalTime destinationArrivalTime;
    private Integer totalStops;
    //to do
    private TrainStatus trainStatus = TrainStatus.PENDING;
    private List<StopDTO> stops;
    private List<TrainClassesDTO> trainClasses;

}
