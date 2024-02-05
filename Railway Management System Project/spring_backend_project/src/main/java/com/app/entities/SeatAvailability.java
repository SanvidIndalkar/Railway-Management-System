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
public class SeatAvailability extends BaseEntity{
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "stop_id")
	private Stop stop;
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "seat_id")
	private Seat seat;
	
	@NotNull
	@Column(name = "isAvailable",nullable = false)
	private Boolean isAvailable = true;
	
	public SeatAvailability(Seat seat, Stop stop) {
		this.seat = seat;
		this.stop = stop;
	}
}
