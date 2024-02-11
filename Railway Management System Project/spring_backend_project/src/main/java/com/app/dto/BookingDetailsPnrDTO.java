/**
 * 
 */
package com.app.dto;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.app.entities.User;
import com.app.enums.Classes;
import com.app.enums.Gender;

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
public class BookingDetailsPnrDTO {
	
	private String firstName;
	private String lastName;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	private StationDTO source;
	
	private StationDTO destination;
	
	@Enumerated(EnumType.STRING)
	private Classes trainClass;
	
	private SeatDTO seat;
	
}
