package com.quangnv.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quangnv.dao.StaffDao;

@Service
public class StaffService {
	@Autowired
	StaffDao dao;
	
	@Transactional(rollbackFor = Exception.class)
	public int insertUser(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId= dao.insertUser(map);
		return returnId;
	}
	
	public List getAllStaff() throws Exception {
		return dao.getAllStaff();
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updateUser(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId= dao.updateUser(map);
		return returnId;
	}
	
	public List getAllCustomer() throws Exception {
		return dao.getAllCustomer();
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updateCustomerToken(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId= dao.updateCustomerToken(map);
		return returnId;
	}
	
	public Map getCustomerTokenById(Map map) throws Exception {
        return dao.getCustomerTokenById(map);
    }
	
	public Map getStaffByUserName(Map map) throws Exception {
        return dao.getStaffByUserName(map);
    }
	
}
