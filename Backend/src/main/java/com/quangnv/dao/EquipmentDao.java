package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EquipmentDao {
	int insertEquipment(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllEquipment() throws Exception;
	Map<Object, Object> getEquipmentById(Map<Object, Object> map) throws Exception;
	int updateEquipment(Map<Object, Object> map) throws Exception;
}
