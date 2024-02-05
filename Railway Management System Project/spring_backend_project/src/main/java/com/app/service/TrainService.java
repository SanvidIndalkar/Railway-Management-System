package com.app.service;

import com.app.dto.TrainDTO;
import com.app.entities.Train;

public interface TrainService {
	
	Train addTrain(TrainDTO trainDTO);

	Train findTrainByNumber(Long trainNumber);

	Train findTrainByName(String trainName);
}
