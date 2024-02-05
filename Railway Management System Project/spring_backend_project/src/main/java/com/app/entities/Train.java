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
	@Column(unique = true, nullable = false)
	private Long trainNumber;
	
	@NotBlank
    private String trainName;

//	done
	@OneToOne
	@NotNull
    private Admin adminId;
    
//	done
	@OneToOne
    @JoinColumn(name = "source_station")
	@NotNull
    private Station source;
    
//	done
	@OneToOne
    @JoinColumn(name = "destination_station")
	@NotNull
    private Station destination;
    
	@DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    
	@DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime sourceDepartureTime;
    
	@DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime destinationArrivalTime;
    
    @NotNull
    private Integer totalSeats;
    
    @NotNull
    private Integer availableSeats;
    
    @NotNull
    private Integer totalStops;
    
//  done
    @OneToMany(mappedBy = "train_id",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Stops> stops;
    
//  done
    @OneToMany(mappedBy = "train_id", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<TrainClasses> trainClasses;
    
}
