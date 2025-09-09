package com.kilopolo.sgtep.repository;

import com.kilopolo.sgtep.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UsersRepository extends JpaRepository<User, Long> {
	Page<User> findAll(Pageable pageable);

	User findByEmail(String email);
}