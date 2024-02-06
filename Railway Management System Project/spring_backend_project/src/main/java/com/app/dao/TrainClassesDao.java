package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.TrainClasses;

public interface TrainClassesDao extends JpaRepository<TrainClasses, Long>{

}
