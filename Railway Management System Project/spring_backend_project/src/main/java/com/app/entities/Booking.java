package com.app.entities;

import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//done

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking extends BaseEntity{

//	done
	@OneToOne
	@NotNull
	private User userId;
	
//	done
	@ManyToOne
	@JoinColumn(name = "train_id")
	@NotNull
	private Train trainId;
	
//	done
	@ManyToOne
	@JoinColumn(name = "source_station_id")
	@NotNull
	private Station source;
	
//	done
	@ManyToOne
	@JoinColumn(name = "destination_station_id")
	@NotNull
	private Station destination;
	
//	done
	@OneToMany(mappedBy = "booking_id",fetch = FetchType.EAGER, cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Passenger> passengers;

}
