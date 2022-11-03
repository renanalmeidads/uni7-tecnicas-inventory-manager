package com.renan.inventorymanager.repositories;

import com.renan.inventorymanager.models.Equipment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEquipmentRepository extends CrudRepository<Equipment, Integer> {
}
