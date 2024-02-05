package com.app.entities;

import javax.persistence.Column;

//done

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Station extends BaseEntity{
	
	@NotBlank
	@Column(name = "station_name")
	private String stationName;
}
