package com.app.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.app.entities.TrainClasses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatDTO {

	private TrainClasses trainClass;

	private Integer seatNumber;
}