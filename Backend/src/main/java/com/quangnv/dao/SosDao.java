package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SosDao {
	int insertnewSos(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllSos() throws Exception;
	int updateStateSos(Map<Object, Object> map) throws Exception;
}
