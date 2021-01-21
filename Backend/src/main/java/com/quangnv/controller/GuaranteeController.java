package com.quangnv.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quangnv.service.GuaranteeService;
import com.quangnv.service.TransactionService;


@RestController
@RequestMapping(value = "/api")
public class GuaranteeController {
	
	@Autowired
	GuaranteeService service;
	
	@Autowired
	TransactionService service_trans;
	
	@GetMapping("/getAllTransCompleted")
	public List<Map<Object, Object>> getAllTransCompleted() {
		List list = new ArrayList();
		try {
			list = service.getAllTransCompleted();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	@PostMapping("/insertGuarantee")
	public Object insertGuarantee(@RequestBody Map request) throws Exception {
		Map mapDataResponse = new HashMap();
		try {
			int returnIdGuarantee = 0;
			returnIdGuarantee = service.insertGuarantee(request);
			
			int returnChangeStateTrans = 0;
			if(returnIdGuarantee !=0) {
//				dochange
				request.put("IS_GUARANTEE", 1);
				returnChangeStateTrans = service_trans.updateTransIsGuarantee(request);
			}
			
			if(returnChangeStateTrans !=0) {
				mapDataResponse.put("STATE", "SUCCESS");
			}else {
				mapDataResponse.put("STATE", "FAIL");
			}
		} catch (Exception e) {
			// TODO: handle exception
			mapDataResponse.put("STATE", "FAIL");
		}
		
		return mapDataResponse;
	}
	
	@GetMapping("/getAllGuarantee")
	public List<Map<Object, Object>> getAllGuarantee() {
		List list = new ArrayList();
		try {
			list = service.getAllGuarantee();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	@GetMapping("/getGuarantedById")
	public Object getGuarantedById(@RequestParam Map request) {
		Map map= new HashMap();
		try {
			map = service.getGuarantedById(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	
	@PostMapping("/updateGuaranted")
	public Object updateGuaranted(@RequestBody Map request) throws Exception {
		Map mapDataResponse = new HashMap();
		try {
			int returnIdGuarantee = 0;
			returnIdGuarantee = service.updateGuaranted(request);
			
			if(returnIdGuarantee !=0) {
				mapDataResponse.put("STATE", "SUCCESS");
			}else {
				mapDataResponse.put("STATE", "FAIL");
			}
		} catch (Exception e) {
			// TODO: handle exception
			mapDataResponse.put("STATE", "FAIL");
		}
		
		return mapDataResponse;
	}
	
	@GetMapping("/getGuarantedByCusId")
	public List<Map<Object, Object>> getGuarantedByCusId(@RequestParam Map request) {
		List list = new ArrayList();
		try {
			list = service.getGuarantedByCusId(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	@PostMapping("/deleteGuarantedById")
	public Object deleteGuarantedById(@RequestBody Map request) throws Exception {
		Map mapDataResponse = new HashMap();
		try {
			int returnIdGuarantee = 0;
			int returnIdTrans = 0;
			returnIdGuarantee = service.deleteGuarantedById(request);
			
			if(returnIdGuarantee !=0) {
				request.put("IS_GUARANTEE", 0);
				returnIdTrans = service_trans.updateTransIsGuarantee(request);
			}
			
			if(returnIdTrans !=0) {
				mapDataResponse.put("STATE", "SUCCESS");
			}else {
				mapDataResponse.put("STATE", "FAIL");
			}
		} catch (Exception e) {
			// TODO: handle exception
			mapDataResponse.put("STATE", "FAIL");
		}
		
		return mapDataResponse;
	}
	
	@GetMapping("/getListIsGuaranted")
	public List<Map<Object, Object>> getListIsGuaranted(@RequestParam Map request) {
		List list = new ArrayList();
		try {
			list = service.getListIsGuaranted(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
}
