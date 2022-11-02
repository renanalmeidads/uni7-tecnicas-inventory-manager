package com.renan.inventorymanager.repositories;

import com.renan.inventorymanager.models.auth.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends CrudRepository<Role, Integer> {

    Role findByName(String name);
}
