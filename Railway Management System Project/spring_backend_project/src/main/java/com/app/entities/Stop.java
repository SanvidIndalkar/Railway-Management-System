package com.app.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.enums.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//done

@Entity
@Table(name = "stops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "train")
public class Stop extends BaseEntity implements Comparable<Stop>{
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "train_id")
	private Train train;
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "station_id")
	private Station station;
	
	@NotNull
	@Column(name = "sequence")
	private Integer sequence;
	
	@NotNull
	@Column(name = "arrival_date")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate arrivalDate;
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	@Column(name = "arrival_time")
	private LocalTime arrivalTime;
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	@Column(name = "departure_time")
	private LocalTime departureTime;

	@Override
	public int compareTo(Stop other) {
		return Integer.compare(this.sequence, other.sequence);
	}
}
