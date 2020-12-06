package com.quangnv.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import com.google.gson.Gson;
import com.quangnv.service.EquipmentService;

@RestController
@RequestMapping(value = "/api")
public class EquipmentController {

	@Autowired
	EquipmentService equip_service;

	@PostMapping(value="/doCreateEquipment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Object doCreateEquipment(@RequestParam(value="file", required=false) MultipartFile file, @RequestParam("equip") String equip) throws Exception {
		Map mapResponse = new HashMap();
//		Map mapData = new HashMap();
		
		Gson gson = new Gson();
		Map mapData = gson.fromJson(equip, Map.class);
		
		if(file == null) {
			//defaul image
			mapData.put("IMAGE", "default-equip.png");
		}else {
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			mapData.put("IMAGE", fileName);
			try {
				File newFile = new File("/home/quangnv/Documents/Car-Garage/Frontend/src/assets/img/system/"
						+ file.getOriginalFilename());
				FileOutputStream fileOutputStream;
				fileOutputStream = new FileOutputStream(newFile);
				fileOutputStream.write(file.getBytes());
				fileOutputStream.close();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		

		try {	
			int returnId = equip_service.insertEquipment(mapData);	
			
			if(returnId !=0) {
				mapResponse.put("ID_RETURNED", returnId);
				mapResponse.put("STATE", "SUCCESS");
						
			}else {
				mapResponse.put("STATE", "FAIL");
			}	
			
		} catch (Exception e) {
			// TODO: handle exception
			mapResponse.put("STATE", "FAIL");
		}

		return mapResponse;
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
	
	@PostMapping(value="/updateEquipment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Object updateEquipment(@RequestParam(value="file", required=false) MultipartFile file, @RequestParam("equip") String equip) throws Exception {
		Map mapResponse = new HashMap();
		
		Gson gson = new Gson();
		Map mapData = gson.fromJson(equip, Map.class);
		if(file == null) {
			//not change image
//			mapData.put("IMAGE", "default-equip.png");
		}else {
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			mapData.put("IMAGE", fileName);
			try {
				File newFile = new File("/home/quangnv/Documents/Car-Garage/Frontend/src/assets/img/system/"
						+ file.getOriginalFilename());
				FileOutputStream fileOutputStream;
				fileOutputStream = new FileOutputStream(newFile);
				fileOutputStream.write(file.getBytes());
				fileOutputStream.close();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		try {
			
			int returnId = equip_service.updateEquipment(mapData);	
			
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
