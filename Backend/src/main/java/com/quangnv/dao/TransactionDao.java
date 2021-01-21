package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TransactionDao {
	int insertTransaction(Map<Object, Object> map) throws Exception;
	int insertTransEquipment(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllTransRepairing() throws Exception;
	Map<Object, Object> getTransRepairById(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getListTransEquipByIdTrans(Map<Object, Object> map) throws Exception;
	int updateTransaction(Map<Object, Object> map) throws Exception;
	int deleteTransEquipByIdTrans(Map<Object, Object> map) throws Exception;
	int updateTransIsGuarantee(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllTransRepairByCusId(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllTransCompletedByCusId(Map<Object, Object> map) throws Exception;
}
