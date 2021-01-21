package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GuaranteeDao {
	List<Map<Object,Object>> getAllTransCompleted() throws Exception;
	int insertGuarantee(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllGuarantee() throws Exception;
	Map<Object, Object> getGuarantedById(Map<Object, Object> map) throws Exception;
	int updateGuaranted(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getGuarantedByCusId(Map<Object, Object> map) throws Exception;
	int deleteGuarantedById(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getListIsGuaranted(Map<Object, Object> map) throws Exception;
}
