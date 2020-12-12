package com.quangnv.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quangnv.dao.AccountDao;


@Service
public class AccountService {
	@Autowired
	AccountDao dao;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;

	public List findAllsAccount() throws Exception {
		return dao.findAllsAccount();
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int insertAccount(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		Map param= new HashMap();
		param.put("USERNAME", map.get("USERNAME"));
		param.put("PASSWORD", bcryptEncoder.encode((CharSequence) map.get("PASSWORD")));
		dao.insertAccount(param);
		returnId = (int) param.get("returnedId");
		return returnId;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updateAccountChangePassword(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		Map param= new HashMap();
		param.put("ID_ACCOUNT", map.get("ID_ACCOUNT"));
		param.put("USERNAME", map.get("USERNAME"));
		param.put("PASSWORD", bcryptEncoder.encode((CharSequence) map.get("PASSWORD")));
		returnId = dao.updateAccount(param);
		return returnId;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updateAccountDontChangePassword(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		Map param= new HashMap();
		param.put("ID_ACCOUNT", map.get("ID_ACCOUNT"));
		param.put("USERNAME", map.get("USERNAME"));
		returnId = dao.updateAccountDontChangePass(param);
		return returnId;
	}
	
	public Map findStaffAccount(Map map) throws Exception {
        return dao.findStaffAccount(map);
    }
	
	public Map findCustomerAccount(Map map) throws Exception {
        return dao.findCustomerAccount(map);
    }

}
