package com.app.entities;

import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.app.enums.Classes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// done

@Entity
@Table(name = "classes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainClasses extends BaseEntity{

//	done
	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "class_name")
	private Classes name;
	
//	done
	@NotNull
	@ManyToOne
	@JoinColumn(name = "train_id")
	private Train train;
	
	@NotNull
	@Column(name = "total_seats")
	private Integer totalSeats;
	
	@NotNull
	@Column(name = "total_seats_available")
	private Integer totalSeatsAvailble;
	
//	done
	@OneToMany(mappedBy = "trainClass", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Seat> seats;
}
