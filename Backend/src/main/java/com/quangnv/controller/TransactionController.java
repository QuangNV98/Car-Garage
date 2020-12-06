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
import org.springframework.web.bind.annotation.RestController;

import com.quangnv.service.TransactionService;


@RestController
@RequestMapping(value = "/api")
public class TransactionController {
	
	@Autowired
	TransactionService service;
	
	@PostMapping("/insertTransaction")
	public Object insertTransaction(@RequestBody Map request) throws Exception {
		Map mapDataResponse = new HashMap();
		List listEquip = new ArrayList();
		if(request.get("LIST_EQUIP") != null) {
			listEquip = (List) request.get("LIST_EQUIP");
		}
		
		try {
			int returnIdTransaction = 0;
			returnIdTransaction = service.insertTransaction(request);
			
			if(returnIdTransaction != 0) {
				if(listEquip.size() >0) {
					for(int i=0;i<listEquip.size();i++) {
						Map reqTrans_Equip = new HashMap();
						Map equipParam = (Map) listEquip.get(i);
						reqTrans_Equip.put("ID_TRANS", returnIdTransaction);
						reqTrans_Equip.put("ID_EQUIP", equipParam.get("ID"));
						reqTrans_Equip.put("QUANTITY_EQUIP", equipParam.get("QUANTITY_EQUIP"));
						reqTrans_Equip.put("PRICE_TOTAL", equipParam.get("PRICE_TOTAL"));
						int returnIdTransEquip = service.insertTransEquipment(reqTrans_Equip);
					}
				}
			}
			if(returnIdTransaction !=0) {
				mapDataResponse.put("ID_RETURNED", returnIdTransaction);
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
	
	@GetMapping("/getAllTransRepairing")
	public List<Map<Object, Object>> getAllTransRepairing() {
		List list = new ArrayList();
		try {
			list = service.getAllTransRepairing();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
}
