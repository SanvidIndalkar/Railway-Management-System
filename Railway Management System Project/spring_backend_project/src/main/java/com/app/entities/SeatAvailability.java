package com.app.entities;

//done

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seatAvaibility")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatAvailability {
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "stop_id")
	private Stops stopId;
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "seat_id")
	private Seats seatId;
	
	@NotNull
	@Column(nullable = false)
	private Boolean isAvailable = true;
}
