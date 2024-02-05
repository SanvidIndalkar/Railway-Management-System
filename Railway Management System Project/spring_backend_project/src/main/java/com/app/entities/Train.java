package com.app.entities;

import java.time.LocalDate;
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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//done

@Entity
@Table(name = "trains")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Train extends BaseEntity{

	@NotNull
	@Column(name = "train_number", unique = true, nullable = false)
	private Long trainNumber;
	
	@NotBlank
	@Column(name = "train_name")
    private String trainName;

//	done
	@ManyToOne
	@NotNull
	@JoinColumn(name = "admin_id")
    private Admin admin;
    
//	done
	@ManyToOne
    @JoinColumn(name = "source_station")
	@NotNull
    private Station source;
    
//	done
	@ManyToOne
    @JoinColumn(name = "destination_station")
	@NotNull
    private Station destination;
    
	@NotNull
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(name = "date")
    private LocalDate date;
    
	
	@DateTimeFormat(pattern = "HH:mm:ss")
	@Column(name = "source_departure_time")
    private LocalTime sourceDepartureTime;
    
	@DateTimeFormat(pattern = "HH:mm:ss")
	@Column(name = "destination_arrival_time")
    private LocalTime destinationArrivalTime;
    
    @NotNull
    @Column(name = "total_stops",nullable = false)
    private Integer totalStops;
    
//  done
    @OneToMany(mappedBy = "train",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Stop> stops;
    
//  done
    @OneToMany(mappedBy = "train", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<TrainClasses> trainClasses;
    
}
