package com.app.entities;

import java.time.LocalTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.app.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//done

@Entity
@Table(name = "passengers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Passenger extends BaseEntity{
	
	@NotBlank
	private String firstName;
	
	@NotBlank
	private String lastName;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
//	done
	@NotNull
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "seat_id")
	private Seats seatId;
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "train_id")
	private Train trainId;
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "booking_id")
	private Booking bookingId;
}
