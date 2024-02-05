package com.app.entities;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//done

@Entity
@Table(name = "stops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Stops extends BaseEntity{
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "train_id")
	private Train trainId;
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "station_id")
	private Station stationId;
	
	@NotNull
	private Integer sequence;
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime arrivalTime;
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	private LocalTime departureTime;
}
