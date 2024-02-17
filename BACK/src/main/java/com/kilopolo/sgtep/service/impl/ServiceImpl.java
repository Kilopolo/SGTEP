package com.kilopolo.sgtep.service.impl;

import java.util.List;
import java.util.Optional;

import com.kilopolo.sgtep.service.ServiceS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;



public abstract class ServiceImpl<S, T> implements ServiceS<T> {

	@Autowired
	S repo;

	public ServiceImpl() {
		super();
	}

	@Override
	public T getById(long id) {

		Optional<T> opt = ((JpaRepository<T, Long>) repo).findById(id);
		T o = null;
		if (opt.isPresent()) {
			o = opt.get();
		} else {
			throw new RuntimeException("el objeto no se encuentra, su nro es: " + id);
		}
		return o;
	}

	@Override
	public List<T> getAll() {
		return ((JpaRepository<T, Long>) repo).findAll();

	}

	@Override
	public void save(T c) {
		((JpaRepository<T, Long>) repo).save(c);

	}

	@Override
	public void deleteById(long id) {
		((JpaRepository<T, Long>) repo).deleteById(id);

	}

	@Override
	public Page<T> findPaginated(int pageNum, int pageSize, String sortField, String sortDirection) {
		// if reducido --> variable = logica ? true : false
		Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending()
				: Sort.by(sortField).descending();

		Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);

		return ((JpaRepository<T, Long>) repo).findAll(pageable);
	}

}