package com.quangnv.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quangnv.dao.GuaranteeDao;

@Service
public class GuaranteeService {
	@Autowired
	GuaranteeDao dao;
	
	public List getAllTransCompleted() throws Exception {
		return dao.getAllTransCompleted();
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int insertGuarantee(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId = dao.insertGuarantee(map);
		return returnId;
	}
	
	public List getAllGuarantee() throws Exception {
		return dao.getAllGuarantee();
	}
	
	public Map getGuarantedById(Map map) throws Exception {
        return dao.getGuarantedById(map);
    }
	
	public List getGuarantedByCusId(Map map) throws Exception {
		return dao.getGuarantedByCusId(map);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updateGuaranted(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId = dao.updateGuaranted(map);
		return returnId;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int deleteGuarantedById(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId = dao.deleteGuarantedById(map);
		return returnId;
	}
	
	public List getListIsGuaranted(Map map) throws Exception {
		return dao.getListIsGuaranted(map);
	}
	
}
