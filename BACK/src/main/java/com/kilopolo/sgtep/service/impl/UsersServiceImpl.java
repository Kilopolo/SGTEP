package com.kilopolo.sgtep.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.kilopolo.sgtep.model.User;
import com.kilopolo.sgtep.repository.UsersRepository;
import com.kilopolo.sgtep.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;




import jakarta.annotation.PostConstruct;

@Service
public class UsersServiceImpl extends ServiceImpl<UsersRepository, User> implements UserService {

	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	@PostConstruct
	public void init() {
	}

	public Page<User> getUsers(Pageable pageable) {
//		Page<User> users = new PageImpl<User>(new LinkedList<User>());

		Page<User> users = usersRepository.findAll(pageable); // .forEach(users::add)
		return users;
	}

	public List<User> getUsers() {
		List<User> users = new ArrayList<User>();

		usersRepository.findAll().forEach(users::add); //
		return users;
	}

	public User getUser(Long id) {
		return usersRepository.findById(id).get();
	}

	public void addUser(User user) {
		// TODO arreglar esto
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//		user.setPassword((user.getPassword()));

		usersRepository.save(user);
	}

//
//	public void editUser(User user) {
//		usersRepository.save(user);
//	}
//
	public User getUserByEmail(String email) {
		return usersRepository.findByEmail(email);
	}
//
//	public void deleteUser(Long id) {
//		usersRepository.deleteById(id);
//	}

}