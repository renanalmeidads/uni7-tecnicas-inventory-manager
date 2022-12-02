package com.renan.inventorymanager.controllers;

import com.renan.inventorymanager.models.Equipment;
import com.renan.inventorymanager.repositories.IEquipmentRepository;
import com.renan.inventorymanager.repositories.IManufacturerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    final IEquipmentRepository equipmentRepository;

    final IManufacturerRepository manufacturerRepository;

    public EquipmentController(IEquipmentRepository equipmentRepository, IManufacturerRepository manufacturerRepository) {
        this.equipmentRepository = equipmentRepository;
        this.manufacturerRepository = manufacturerRepository;
    }

    @GetMapping("/{id}")
    public Equipment getEquipment(@PathVariable Integer id) {

        Optional<Equipment> equipment = equipmentRepository.findById(id);

        return equipment.get();
    }

    @PostMapping
    public ResponseEntity addEquipment(@RequestBody Equipment equipment) {

        manufacturerRepository.save(equipment.getManufacturer());

        equipment.setCreationDate(new Date());
        equipment.setUpdateDate(new Date());
        equipment.setAvailable(true);

        equipmentRepository.save(equipment);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity updateEquipment(@RequestBody Equipment equipment)
    {
        if(equipment != null)
        {
            if(equipmentRepository.existsById(equipment.getId()))
            {
                Optional<Equipment> old = equipmentRepository.findById(equipment.getId());

                manufacturerRepository.save(equipment.getManufacturer());

                equipment.setUpdateDate(new Date());
                equipment.setCreationDate(old.get().getCreationDate());
                equipment.setAvailable(old.get().getAvailable());

                equipmentRepository.save(equipment);

                return new ResponseEntity(HttpStatus.CREATED);
            }

            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/all")
    public Iterable<Equipment> getAllEquipments() {

        Iterable<Equipment> equipments = equipmentRepository.findAll();

        return equipments;
    }
}
