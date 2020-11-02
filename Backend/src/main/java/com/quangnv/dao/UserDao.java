package com.quangnv.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.quangnv.model.Account;

@Repository
public interface UserDao extends CrudRepository<Account, Integer> {
	
	Account findByUsername(String username);
	
}