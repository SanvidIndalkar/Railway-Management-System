/**
 * 
 */
package com.app.dto;

import java.time.LocalDate;
import java.util.List;

import com.app.entities.User;
import com.app.enums.Classes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author sanvi
 *
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingPassengersDTO {
	
	private Long userId;
	private StationDTO source;
	private StationDTO destination;
	
	private Classes trainClass;
	
	private Integer totalPassengers;
	
	List<PassengerDTO> passengersDTO;
	
}
