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
import com.app.enums.UserRole;

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
    
    @NotBlank
    @Column(name = "first_name")
    private String firstName;
    
    @NotBlank
    @Column(name = "last_name")
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;
    
    @NotBlank
    @Email
    @Column(name = "email")
    private String email;
    
    @NotBlank
    @Column(name = "adhaar_no")
    private String adhaarNo;
    
    @NotBlank
    @Column(name = "mobile_no")
    private String mobileNo;
    
    @NotBlank
    @Column(name = "state")
    private String state;
   
    @NotBlank
    @Column(name = "city")
    private String city;
    
    @NotNull
    @Column(name = "pincode")
    private Integer pincode; 

    @NotBlank
    @Column(name = "password")
    private String password;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "dob")
    private LocalDate dob;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private UserRole role;
    
}

