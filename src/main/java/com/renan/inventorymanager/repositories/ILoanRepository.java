package com.renan.inventorymanager.repositories;

import com.renan.inventorymanager.models.Loan;
import com.renan.inventorymanager.models.auth.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ILoanRepository extends CrudRepository<Loan, Integer> {
    Collection<Loan> findAllByUser(User user);
}
