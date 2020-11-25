package com.quangnv.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api")
public class StaffController {
	
	@PostMapping("/doSaveStaff")
	public Object doSaveStaff(@RequestBody Map request) throws Exception {
		Map mapData = new HashMap();
		
		return mapData;
	}
}
