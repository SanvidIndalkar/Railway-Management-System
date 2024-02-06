package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.app.entities.Station;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StopDTO {
	
	@JsonIgnore
	private TrainDTO train;
	private Station station;
    private Integer sequence;
    private LocalDate arrivalDate;
    private LocalTime arrivalTime;
    private LocalTime departureTime;
}
