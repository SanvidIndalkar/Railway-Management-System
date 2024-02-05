package com.app.entities;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.app.enums.Classes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//done


@Entity
@Table(name = "seats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Seats extends BaseEntity{
	
	@ManyToOne
	@JoinColumn(name = "class_id")
	@NotNull
	private TrainClasses classId;
	
	@NotNull
	private Integer seatNumber;
	
}
