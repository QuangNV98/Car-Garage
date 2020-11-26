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

import com.quangnv.service.EquipmentService;

@RestController
@RequestMapping(value = "/api")
public class EquipmentController {

	@Autowired
	EquipmentService equip_service;

	@PostMapping("/doCreateEquipment")
	public Object doCreateEquipment(@RequestBody Map request) throws Exception {
		Map mapData = new HashMap();

		try {
			
			int returnId = equip_service.insertEquipment(request);	
			
			if(returnId !=0) {
				mapData.put("ID_RETURNED", returnId);
				mapData.put("STATE", "SUCCESS");
				
			}else {
				mapData.put("STATE", "FAIL");
			}	
			
		} catch (Exception e) {
			// TODO: handle exception
			mapData.put("STATE", "FAIL");
		}

		return mapData;
	}
	
	@GetMapping("/getAllEquipment")
	public List<Map<Object, Object>> getAllEquipment() {
		List list = new ArrayList();
		try {
			list = equip_service.getAllEquipment();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	@GetMapping("/getEquipmentById")
	public Object getEquipmentById(@RequestParam Map request) {
		Map map= new HashMap();
		try {
			map = equip_service.getEquipmentById(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	
	@PostMapping("/updateEquipment")
	public Object updateEquipment(@RequestBody Map request) throws Exception {
		Map mapData = new HashMap();

		try {
			
			int returnId = equip_service.updateEquipment(request);	
			
			if(returnId !=0) {
				mapData.put("STATE", "SUCCESS");
				
			}else {
				mapData.put("STATE", "FAIL");
			}	
			
		} catch (Exception e) {
			// TODO: handle exception
			mapData.put("STATE", "FAIL");
		}

		return mapData;
	}

}
