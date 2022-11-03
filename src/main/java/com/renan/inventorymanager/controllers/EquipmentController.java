package com.renan.inventorymanager.controllers;

import com.renan.inventorymanager.models.Equipment;
import com.renan.inventorymanager.repositories.IEquipmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    final IEquipmentRepository equipmentRepository;

    public EquipmentController(IEquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    @GetMapping("/{id}")
    public Equipment getEquipment(@PathVariable Integer id) {

        Optional<Equipment> equipment = equipmentRepository.findById(id);

        return equipment.get();
    }

    @PostMapping
    public ResponseEntity addEquipment(@RequestBody Equipment equipment) {

        equipment.setCreationDate(new Date());

        equipmentRepository.save(equipment);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Equipment> getAllEquipments() {

        Iterable<Equipment> equipments = equipmentRepository.findAll();

        return equipments;
    }
}
