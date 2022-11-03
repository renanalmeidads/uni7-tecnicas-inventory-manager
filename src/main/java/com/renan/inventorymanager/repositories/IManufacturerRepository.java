package com.renan.inventorymanager.repositories;

import com.renan.inventorymanager.models.Manufacturer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IManufacturerRepository extends CrudRepository<Manufacturer, Integer> {
}
