package com.quangnv.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quangnv.dao.NotificationDao;

@Service
public class NotificationService {
	@Autowired
	NotificationDao dao;
	
	public List getListNotificationById(Map<Object, Object> map) throws Exception {
		return dao.getListNotificationById(map);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int insertNotification(Map<Object, Object> map) throws Exception {
		int returnId = 0;
		returnId = dao.insertNotification(map);
		return returnId;
	}
	
}
