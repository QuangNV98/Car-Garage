package com.quangnv.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quangnv.dao.SosDao;

@Service
public class SosService {
	@Autowired
	SosDao dao;
	
	@Transactional(rollbackFor = Exception.class)
	public int insertnewSos(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId= dao.insertnewSos(map);
		return returnId;
	}
	
	public List getAllSos() throws Exception {
		return dao.getAllSos();
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updateStateSos(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId= dao.updateStateSos(map);
		return returnId;
	}

}
