package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NotificationDao {
	List<Map<Object,Object>> getListNotificationById(Map<Object, Object> map) throws Exception;
	int insertNotification(Map<Object, Object> map) throws Exception;
}
