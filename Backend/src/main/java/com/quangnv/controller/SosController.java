package com.quangnv.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quangnv.service.SosService;

@RestController
@RequestMapping(value = "/api")
public class SosController {
	@Autowired
	private SimpMessagingTemplate messageTemplate;

	@Autowired
	SosService sos_service;

//    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    public Greeting greeting(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }

	@PostMapping("/sos")
	public Object test(@RequestBody Map request) {
		Map mapResponse = new HashMap();
		try {
			int idInsertSos = sos_service.insertnewSos(request);
			if (idInsertSos != 0) {
				messageTemplate.convertAndSend("/topic/greetings", request);
				mapResponse.put("STATUS", "SUCCESS");
			}
		} catch (Exception e) {
			// TODO: handle exception
			mapResponse.put("STATUS", "FAIL");
		}
		
		return mapResponse;
	}
	
	@RequestMapping("/sos1")
	public void test1(@RequestBody Map request) {

		try {
			int idInsertSos = sos_service.insertnewSos(request);
			if (idInsertSos != 0) {
				messageTemplate.convertAndSend("/topic1/greetings1", request);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	@GetMapping("/getAllSos")
	public List<Map<Object, Object>> getAllSos() {
		List list = new ArrayList();
		try {
			list = sos_service.getAllSos();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@PostMapping("/doUpdateStateSos")
	public Object updateStateSos(@RequestBody Map request) throws Exception {
		Map mapData = new HashMap();

		try {
			int idUpdateState = sos_service.updateStateSos(request);
	
			if (idUpdateState == 1 ) {
				mapData.put("STATE", "SUCCESS");
			} else {
				mapData.put("STATE", "FAIL");
			}
		} catch (Exception e) {
			mapData.put("STATE", "FAIL");
		}

		return mapData;
	}
	
	@PostMapping("/doIgnoreSos")
	public Object doIgnoreSos(@RequestBody Map request) throws Exception {
		Map mapData = new HashMap();

		try {
			int idUpdateState = sos_service.doIgnoreSos(request);
	
			if (idUpdateState == 1 ) {
				mapData.put("STATE", "SUCCESS");
			} else {
				mapData.put("STATE", "FAIL");
			}
		} catch (Exception e) {
			mapData.put("STATE", "FAIL");
		}

		return mapData;
	}
}
