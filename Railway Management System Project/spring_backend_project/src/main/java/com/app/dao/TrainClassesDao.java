package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Train;
import com.app.entities.TrainClasses;
import com.app.enums.Classes;

public interface TrainClassesDao extends JpaRepository<TrainClasses, Long>{

	TrainClasses findByTrainAndName(Train train, Classes trainClassName);

}
