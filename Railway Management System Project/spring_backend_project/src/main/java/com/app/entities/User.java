package com.app.entities;

//done

import java.time.LocalDate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.app.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;
    
    @Column(unique = true)
    @NotBlank
    @Length(min = 5, max = 12)
    private String username;
    
    @NotBlank
    private String firstName;
    
    @NotBlank
    private String lastName;

    @NotBlank
    private Gender gender;
    
    @NotNull
    private Integer age;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    private String adhaarNo;
    
    @NotBlank
    private String mobileNo;
    
    @NotBlank
    private String state;
   
    @NotBlank
    private String city;
    
    @NotNull
    private Integer pincode; 

    @NotBlank
    private String password;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;
    
}

