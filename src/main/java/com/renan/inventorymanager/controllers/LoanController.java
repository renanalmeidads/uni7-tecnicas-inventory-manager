package com.renan.inventorymanager.controllers;

import com.renan.inventorymanager.models.Equipment;
import com.renan.inventorymanager.models.Loan;
import com.renan.inventorymanager.models.LoanStatus;
import com.renan.inventorymanager.models.auth.User;
import com.renan.inventorymanager.repositories.IEquipmentRepository;
import com.renan.inventorymanager.repositories.ILoanRepository;
import com.renan.inventorymanager.repositories.IUserRepository;
import com.renan.inventorymanager.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/loan")
public class LoanController {

    final ILoanRepository loanRepository;
    final IUserRepository userRepository;
    final IEquipmentRepository equipmentRepository;

    public LoanController(ILoanRepository loanRepository, IUserRepository userRepository, IEquipmentRepository equipmentRepository) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.equipmentRepository = equipmentRepository;
    }

    @GetMapping("/{id}")
    public Loan getLoan(@PathVariable Integer id) {
        Optional<Loan> loan = loanRepository.findById(id);
        return loan.get();
    }

    @PostMapping
    public ResponseEntity addLoan(@RequestBody Loan loan) {
        UserDetailsImpl userDetails = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<User> user = userRepository.findById(userDetails.getId());
        Optional<Equipment> equipment = equipmentRepository.findEquipmentByIdAndAvailable(loan.getEquipment().getId(), true);

        if(user.isPresent() && equipment.isPresent())
        {
            equipmentRepository.updateEquipmentSetAvailableForId(equipment.get().getId(), false);

            loan.setUser(user.get());
            loan.setEquipment(equipment.get());
            loan.setCreationDate(new Date());
            loan.setActiveStatus();

            loanRepository.save(loan);

            return new ResponseEntity(HttpStatus.CREATED);
        }

        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PutMapping
    public ResponseEntity updateLoan(@RequestBody Loan loan)
    {
        if(loan != null)
        {
            if(loanRepository.existsById(loan.getId()))
            {
                Optional<Loan> existentLoan = loanRepository.findById(loan.getId());

                if(existentLoan.isPresent()) {
                    loanRepository.updateLoanSetStatusForId(loan.getId(), LoanStatus.INACTIVE);
                    equipmentRepository.updateEquipmentSetAvailableForId(existentLoan.get().getEquipment().getId(), true);

                    return new ResponseEntity(HttpStatus.CREATED);
                }
            }

            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/all")
    public Iterable<Loan> getAllLoans() {

        UserDetailsImpl userDetails = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<User> user = userRepository.findById(userDetails.getId());

        if(user.isPresent()) {
            Iterable<Loan> loans = loanRepository.findAllByUser(user.get());

            return loans;
        }

        return null;
    }
}
