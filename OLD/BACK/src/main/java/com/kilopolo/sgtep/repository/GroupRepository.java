package com.kilopolo.sgtep.repository;

import com.kilopolo.sgtep.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByName(String name);
}