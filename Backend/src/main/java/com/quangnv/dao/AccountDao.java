package com.quangnv.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountDao {
	List<Map<Object,Object>> findAllsAccount() throws Exception;
}
