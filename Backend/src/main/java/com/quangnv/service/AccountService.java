package com.quangnv.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quangnv.dao.AccountDao;


@Service
public class AccountService {
	@Autowired
	AccountDao dao;

	public List findAllsAccount() throws Exception {
		return dao.findAllsAccount();
	}

}
