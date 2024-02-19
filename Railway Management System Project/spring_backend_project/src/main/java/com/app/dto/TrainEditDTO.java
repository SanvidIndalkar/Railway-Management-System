package com.app.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainEditDTO {

	private Long trainNumber;

    private String trainName;
}
