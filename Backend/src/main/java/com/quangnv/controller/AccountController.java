package com.quangnv.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quangnv.service.AccountService;

@RestController
@RequestMapping("/api")
public class AccountController {
	@Autowired
	AccountService service;

	@GetMapping("/getAllsAccount")
	public List<Map<Object, Object>> getAlls() {
		List list = new ArrayList();
		try {
			list = service.findAllsAccount();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	@GetMapping("/getInfoCustomerAfterLogin")
	public Object getInfoCustomerAfterLogin(@RequestParam Map request) {
		Map map= new HashMap();
		try {
			map = service.getInfoCustomerAfterLogin(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}

}
