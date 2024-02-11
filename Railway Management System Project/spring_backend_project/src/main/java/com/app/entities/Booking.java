package com.app.entities;

import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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


// done
@Column(name = "pnr", nullable = false, unique = true)
private Long pnr;


// done
@ManyToOne
@NotNull
@JoinColumn(name = "user_id")
private User user;

// done
@ManyToOne
@JoinColumn(name = "train_id")
@NotNull
private Train train;

// done
@ManyToOne
@JoinColumn(name = "source_station_id")
@NotNull
private Station source;

// done
@ManyToOne
@JoinColumn(name = "destination_station_id")
@NotNull
private Station destination;

// done
@Column(name = "total_passengers")
@NotNull
private Integer totalPassengers;

// done
@OneToMany(mappedBy = "booking",fetch = FetchType.LAZY, cascade = CascadeType.ALL,orphanRemoval = true)
private List<Passenger> passengers;

}