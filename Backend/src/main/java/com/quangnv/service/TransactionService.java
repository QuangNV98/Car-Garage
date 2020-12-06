package com.quangnv.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quangnv.dao.TransactionDao;

@Service
public class TransactionService {
	@Autowired
	TransactionDao dao;
	
	@Transactional(rollbackFor = Exception.class)
	public int insertTransaction(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		dao.insertTransaction(map);
		returnId = (int) map.get("returnedId");
		return returnId;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int insertTransEquipment(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId = dao.insertTransEquipment(map);
		return returnId;
	}
	
	public List getAllTransRepairing() throws Exception {
		return dao.getAllTransRepairing();
	}
	
}
