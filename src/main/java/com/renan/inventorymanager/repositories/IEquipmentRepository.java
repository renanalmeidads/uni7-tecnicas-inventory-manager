package com.renan.inventorymanager.repositories;

import com.renan.inventorymanager.models.Equipment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface IEquipmentRepository extends CrudRepository<Equipment, Integer> {

    Optional<Equipment> findEquipmentByIdAndAvailable(Integer Id, Boolean available);

    @Transactional
    @Modifying
    @Query("update Equipment e set e.available= :available where e.id = :id")
    int updateEquipmentSetAvailableForId(@Param("id") Integer id, @Param("available") Boolean available);
}
