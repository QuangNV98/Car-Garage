package com.quangnv.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quangnv.service.AccountService;
import com.quangnv.service.StaffService;

@RestController
@RequestMapping(value = "/api")
public class StaffController {

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	AccountService service;

	@Autowired
	StaffService staff_service;

	@PostMapping("/doCreateUser")
	public Object doSaveStaff(@RequestBody Map request) throws Exception {
		Map mapData = new HashMap();

		try {
			int returnIdAccount = 0;
			int returnIdStaff = 0;
			returnIdAccount = service.insertAccount(request);

			if (returnIdAccount != 0) {
				request.put("ID_ACCOUNT", returnIdAccount);
				returnIdStaff = staff_service.insertUser(request);
			}
			if (returnIdStaff != 0) {
				mapData.put("STATE", "SUCCESS");
			} else {
				mapData.put("STATE", "FAIL");
			}
		} catch (Exception e) {
			// TODO: handle exception
			mapData.put("STATE", "FAIL");
		}

		return mapData;
	}

	@PostMapping("/doUpdateUser")
	public Object doUpdateUser(@RequestBody Map request) throws Exception {
		Map mapData = new HashMap();

		if (request.get("PASSWORD") != null && !"".equals(request.get("PASSWORD"))) {
			try {
				// update acount
				int idUpdateAccount = service.updateAccountChangePassword(request);
				int idUpdateUser = staff_service.updateUser(request);
				if (idUpdateAccount == 1 && idUpdateUser == 1) {
					mapData.put("STATE", "SUCCESS");
				} else {
					mapData.put("STATE", "FAIL");
				}
				// update user
			} catch (Exception e) {
				mapData.put("STATE", "FAIL");
			}
		} else {
			try {
				int idUpdateAccount = service.updateAccountDontChangePassword(request);
				int idUpdateUser = staff_service.updateUser(request);
				if (idUpdateAccount == 1 && idUpdateUser == 1) {
					mapData.put("STATE", "SUCCESS");
				} else {
					mapData.put("STATE", "FAIL");
				}
			} catch (Exception e) {
				// TODO: handle exception
				mapData.put("STATE", "FAIL");
			}
		}

		return mapData;
	}

	@GetMapping("/getAllStaff")
	public List<Map<Object, Object>> getAllStaff() {
		List list = new ArrayList();
		try {
			list = staff_service.getAllStaff();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@GetMapping("/getAllCustomer")
	public List<Map<Object, Object>> getAllCustomer() {
		List list = new ArrayList();
		try {
			list = staff_service.getAllCustomer();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@PostMapping("/updateCustomerToken")
	public Object updateCustomerToken(@RequestBody Map request) throws Exception {
		Map mapData = new HashMap();

		try {
			int idUpdateToken = 0;
			idUpdateToken = staff_service.updateCustomerToken(request);
			if (idUpdateToken !=0) {
				mapData.put("STATE", "SUCCESS");
			} else {
				mapData.put("STATE", "FAIL");
			}
			// update user
		} catch (Exception e) {
			mapData.put("STATE", "FAIL");
		}

		return mapData;
	}
	
	@GetMapping("/getStaffByUserName")
	public Object getStaffByUserName(@RequestParam Map request) {
		Map map= new HashMap();
		try {
			map = staff_service.getStaffByUserName(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
}
