package com.quangnv.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quangnv.service.NotificationService;

@RestController
@RequestMapping(value = "/api")
public class NotificationController {

	@Autowired
	NotificationService service;

	@GetMapping("/getListNotificationById")
	public List<Map<Object, Object>> getListNotificationById(@RequestParam Map request) {
		List list = new ArrayList();
		try {
			list = service.getListNotificationById(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

}
