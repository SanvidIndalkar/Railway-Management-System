package com.app.service;

import java.util.List;

import com.app.dto.TrainDTO;
import com.app.dto.TrainOnlyDTO;
import com.app.dto.TrainRescheduleDTO;
import com.app.dto.TrainSrcDestDateDTO;
import com.app.entities.Train;

public interface TrainService {
	
	Train addTrain(TrainDTO trainDTO);

	TrainOnlyDTO findTrainByNumber(Long trainNumber);

	TrainOnlyDTO findTrainByName(String trainName);

	List<TrainOnlyDTO> findAllTrains();

	List<TrainDTO> findTrainBySourceDestinationDate(TrainSrcDestDateDTO srcDestDate);

	TrainDTO findTrainById(Long trainId);

	List<TrainOnlyDTO> getAllTrainsByAdmin(Long adminId);

	List<TrainDTO> findTrainsByTwoStopsInSequence(TrainSrcDestDateDTO searchInfo);

	String reschuduleTrain(TrainRescheduleDTO trainRescheduleDTO);
}
