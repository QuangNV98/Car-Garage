package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StaffDao {
	int insertUser(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllStaff() throws Exception;
	int updateUser(Map<Object, Object> map) throws Exception;
	List<Map<Object,Object>> getAllCustomer() throws Exception;
}
