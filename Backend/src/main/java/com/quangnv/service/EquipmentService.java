package com.quangnv.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quangnv.dao.EquipmentDao;

@Service
public class EquipmentService {
	@Autowired
	EquipmentDao dao;

	@Transactional(rollbackFor = Exception.class)
	public int insertEquipment(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		dao.insertEquipment(map);
		returnId = (int) map.get("returnedId");
		return returnId;
	}
	
	public List getAllEquipment() throws Exception {
		return dao.getAllEquipment();
	}
	
	public Map getEquipmentById(Map map) throws Exception {
        return dao.getEquipmentById(map);
    }
	
	@Transactional(rollbackFor = Exception.class)
	public int updateEquipment(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId = dao.updateEquipment(map);
		return returnId;
	}
	
}
