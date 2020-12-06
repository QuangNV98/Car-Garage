package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TransactionDao {
	int insertTransaction(Map<Object, Object> map) throws Exception;
	int insertTransEquipment(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllTransRepairing() throws Exception;
}
