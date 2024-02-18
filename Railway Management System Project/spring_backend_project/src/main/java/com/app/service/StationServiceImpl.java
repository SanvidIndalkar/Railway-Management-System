package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.StationDao;
import com.app.dto.StationDTO;


@Service
@Transactional
public class StationServiceImpl implements StationService{

	@Autowired
	private StationDao stationDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public List<StationDTO> findAll() {
		
		return stationDao.findAll().stream()
		.map((st) -> mapper.map(st, StationDTO.class))
		.collect(Collectors.toList());
	}

	
}
