package com.quangnv.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quangnv.dao.UserDao;
import com.quangnv.model.Account;
import com.quangnv.model.UserDTO;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private AccountService accountService;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		Account user = userDao.findByUsername(username);
		Map param = new HashMap();
		param.put("USERNAME", username);
		Map user = new HashMap();

		try {
			user = accountService.findUser(param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		grantedAuthorities.add(new SimpleGrantedAuthority(user.get("ROLE").toString()));
//		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
//				new ArrayList<>());
		return new org.springframework.security.core.userdetails.User(user.get("USERNAME").toString(),
				user.get("PASSWORD").toString(), grantedAuthorities);
	}
	
	public UserDetails loadEmployeeByUsername(String username) throws UsernameNotFoundException {
//		Account user = userDao.findByUsername(username);
		Map param = new HashMap();
		param.put("USERNAME", username);
		Map user = new HashMap();

		try {
			user = accountService.findStaffAccount(param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		grantedAuthorities.add(new SimpleGrantedAuthority(user.get("ROLE").toString()));
//		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
//				new ArrayList<>());
		return new org.springframework.security.core.userdetails.User(user.get("USERNAME").toString(),
				user.get("PASSWORD").toString(), grantedAuthorities);
	}
	
	public UserDetails loadCusByUsername(String username) throws UsernameNotFoundException {
//		Account user = userDao.findByUsername(username);
		Map param = new HashMap();
		param.put("USERNAME", username);
		Map user = new HashMap();

		try {
			user = accountService.findCustomerAccount(param);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		grantedAuthorities.add(new SimpleGrantedAuthority(user.get("ROLE").toString()));
//		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
//				new ArrayList<>());
		return new org.springframework.security.core.userdetails.User(user.get("USERNAME").toString(),
				user.get("PASSWORD").toString(), grantedAuthorities);
	}

	public Account save(UserDTO user) {
		Account newUser = new Account();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userDao.save(newUser);
	}
}