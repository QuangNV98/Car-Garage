package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountDao {
	List<Map<Object,Object>> findAllsAccount() throws Exception;
	int insertAccount(Map<Object, Object> map) throws Exception;
	int updateAccount(Map<Object, Object> map) throws Exception;
	int updateAccountDontChangePass(Map<Object, Object> map) throws Exception;
	Map<Object, Object> findStaffAccount(Map<Object, Object> map) throws Exception;
	Map<Object, Object> findCustomerAccount(Map<Object, Object> map) throws Exception;
}
