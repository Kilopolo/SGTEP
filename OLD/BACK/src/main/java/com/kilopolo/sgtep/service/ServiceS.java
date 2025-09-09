package com.kilopolo.sgtep.service;

import java.util.List;

import org.springframework.data.domain.Page;

public interface ServiceS<T> {
	T getById(long id);

	List<T> getAll();

	void save(T c);

	void deleteById(long id);

	Page<T> findPaginated(int pageNum, int pageSize, String sortField, String sortDirection);

}
