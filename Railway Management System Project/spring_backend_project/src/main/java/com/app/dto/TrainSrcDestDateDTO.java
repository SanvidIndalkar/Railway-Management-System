package com.app.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.Station;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainSrcDestDateDTO {

	private StationDTO source;
	private StationDTO destination;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate journeyDate;
	
	
}
