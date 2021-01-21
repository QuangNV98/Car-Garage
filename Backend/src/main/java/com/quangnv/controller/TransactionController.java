package com.quangnv.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

import com.quangnv.config.FirebaseConfig;
import com.quangnv.model.FCMRequest;
import com.quangnv.service.NotificationService;
import com.quangnv.service.TransactionService;


@RestController
@RequestMapping(value = "/api")
public class TransactionController {
	
	@Autowired
	TransactionService service;
	
	@Autowired
    private FirebaseConfig notificationService;
	
	@Autowired
	NotificationService serviceNoti;
	
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
				DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");  
				LocalDateTime now = LocalDateTime.now();  
				String timeStr = dtf.format(now);
				Map reqNoti = new HashMap();
				reqNoti.put("ID_CUS", request.get("ID_CUS"));
				reqNoti.put("TITLE", "Thêm mới");
				reqNoti.put("BODY", "Đơn hàng của bạn vừa được tạo mới");
				reqNoti.put("TIME", timeStr);
				
				serviceNoti.insertNotification(reqNoti);
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
	
	@PostMapping("/updateTransaction")
	public Object updateTransaction(@RequestBody Map request) throws Exception {
		Map mapDataResponse = new HashMap();
		List listEquip = new ArrayList();
		if(request.get("LIST_EQUIP") != null) {
			listEquip = (List) request.get("LIST_EQUIP");
		}
		
		try {
			int returnIdTransaction = 0;
			returnIdTransaction = service.updateTransaction(request);
			
			if(returnIdTransaction != 0) {
				int returnIdDelTransEquip = 0;
				returnIdDelTransEquip = service.deleteTransEquipByIdTrans(request);
				
				if(returnIdDelTransEquip != 0) {
					for(int i=0;i<listEquip.size();i++) {
						Map reqTrans_Equip = new HashMap();
						Map equipParam = (Map) listEquip.get(i);
						reqTrans_Equip.put("ID_TRANS", request.get("ID"));
						reqTrans_Equip.put("ID_EQUIP", equipParam.get("ID"));
						reqTrans_Equip.put("QUANTITY_EQUIP", equipParam.get("QUANTITY_EQUIP"));
						reqTrans_Equip.put("PRICE_TOTAL", equipParam.get("PRICE_TOTAL"));
						int returnIdTransEquip = service.insertTransEquipment(reqTrans_Equip);
					}
				}	
			}
//			yHwfP3Pdrvu91iKJAxKNxlkxXjYjcqudnTOjUyfp36z7Of_bfMREioXtFeAUMFoA50j54BZ782XCDDLna2r4uSXZqyQwe4J5
			//push Notification
//			FCMRequest fcmRequest= new FCMRequest();
//			fcmRequest.setToken("yHwfP3Pdrvu91iKJAxKNxlkxXjYjcqudnTOjUyfp36z7Of_bfMREioXtFeAUMFoA50j54BZ782XCDDLna2r4uSXZqyQwe4J5");
//			fcmRequest.setTitle("Change of your transaction");
//			fcmRequest.setBody("Your transaction is just updated");
//			String res= notificationService.sendFCMToDevice(fcmRequest);
//			System.out.println("response", res);
			
			if(returnIdTransaction !=0) {
				DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");  
				LocalDateTime now = LocalDateTime.now();  
				String timeStr = dtf.format(now);
				Map reqNoti = new HashMap();
				reqNoti.put("ID_CUS", request.get("ID_CUS"));
				reqNoti.put("TITLE", "Cập nhật");
				reqNoti.put("BODY", "Đơn hàng của bạn vừa được cập nhật");
				reqNoti.put("TIME", timeStr);
				
				serviceNoti.insertNotification(reqNoti);
			}
			
			if(returnIdTransaction !=0) {
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
	
	@GetMapping("/getTransRepairById")
	public Object getTransRepairById(@RequestParam Map request) {
		Map map= new HashMap();
		try {
			map = service.getTransRepairById(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	
	@GetMapping("/getListTransEquip")
	public List<Map<Object, Object>> getListTransEquipBy(@RequestParam Map request) {
		List list = new ArrayList();
		try {
			list = service.getListTransEquipByIdTrans(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	//api for mobile
	@GetMapping("/getAllTransRepairByCusId")
	public List<Map<Object, Object>> getAllTransRepairByCusId(@RequestParam Map request) {
		List list = new ArrayList();
		try {
			list = service.getAllTransRepairByCusId(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	//api for mobile
		@GetMapping("/getAllTransCompletedByCusId")
		public List<Map<Object, Object>> getAllTransCompletedByCusId(@RequestParam Map request) {
			List list = new ArrayList();
			try {
				list = service.getAllTransCompletedByCusId(request);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return list;
		}
}
