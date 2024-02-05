package com.app.entities;

//done

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.app.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends BaseEntity{
	
	@NotBlank
	private String firstName;
	
	@NotBlank
	private String lastName;

	@NotBlank
	@Email
	private String email;
	
	@Column(nullable=false)
	private String password;

	@NotBlank
	@Enumerated(EnumType.STRING)
	private Gender gender;
}

