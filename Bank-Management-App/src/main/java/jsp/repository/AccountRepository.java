package jsp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jsp.entity.Account;
import jsp.entity.Bank;
import jsp.enums.AccountType;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByAccountNumber(String accountNumber);

    List<Account> findByAccountType(AccountType accountType);

    List<Account> findByBank(Bank bank);

    List<Account> findByBalanceGreaterThan(double balance);

    boolean existsByAccountNumber(String accountNumber);
}