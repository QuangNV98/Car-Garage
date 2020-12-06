package com.quangnv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SosController {
	@Autowired
	private SimpMessagingTemplate messageTemplate;
	
//    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    public Greeting greeting(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }
    
    @RequestMapping("/test")
    public String test() {
    	String data = "response";
    	messageTemplate.convertAndSend("/topic/greetings", data);
    	return data;
    }
}
