package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.app.entities.Station;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StopDTO {
	
	private TrainDTO train;
	private Long stationId;
    private Integer sequence;
    private LocalDate arrivalDate;
    private LocalTime arrivalTime;
    private LocalTime departureTime;
}
