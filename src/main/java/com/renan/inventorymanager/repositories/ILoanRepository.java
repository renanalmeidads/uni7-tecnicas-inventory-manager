package com.renan.inventorymanager.repositories;

import com.renan.inventorymanager.models.Loan;
import com.renan.inventorymanager.models.LoanStatus;
import com.renan.inventorymanager.models.auth.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Repository
public interface ILoanRepository extends CrudRepository<Loan, Integer> {
    Collection<Loan> findAllByUser(User user);
    @Transactional
    @Modifying
    @Query("update Loan l set l.status = :status where l.id = :id")
    int updateLoanSetStatusForId(@Param("id") Integer id, @Param("status") LoanStatus status);

}
