package jsp.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import jsp.repository.BankRepository;
import org.springframework.transaction.annotation.Transactional;

import jsp.dto.DepositRequest;
import jsp.exception.InvalidAmountException;
import jsp.dto.WithdrawRequest;
import jsp.exception.InsufficientBalanceException;
import jsp.dto.TransferRequest;

import jsp.repository.AccountRepository;
import jsp.repository.AddressRepository;
import jsp.entity.Account;
import jsp.entity.Address;
import jsp.entity.Bank;
import jsp.enums.AccountType;
import jsp.exception.AccountNotFoundException;
import jsp.exception.BankNotFoundException;
import jsp.exception.DuplicateAccountNumberException;
import jsp.exception.NoRecordsAvailableException;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final BankRepository bankRepository;
    

    public AccountService(AccountRepository accountRepository,
            BankRepository bankRepository) {

this.accountRepository = accountRepository;
this.bankRepository = bankRepository;

}
    @Transactional
    public Account createAccount(Integer bankId, Account account) {

        if (accountRepository.existsByAccountNumber(
                account.getAccountNumber())) {

            throw new DuplicateAccountNumberException(
                    "Account number already exists: "
                            + account.getAccountNumber()
            );
        }

        Bank bank = bankRepository.findById(bankId)
                .orElseThrow(() ->
                        new BankNotFoundException(
                                "Bank not found with id: " + bankId
                        )
                );
        

        account.setBank(bank);
        
        double minimumBalance;

        switch (account.getAccountType()) {

            case SAVINGS:
                minimumBalance = 500;
                break;

            case CURRENT:
                minimumBalance = 1000;
                break;

            case FIXED_DEPOSIT:
                minimumBalance = 5000;
                break;

            default:
                minimumBalance = 0;
        }
        if (account.getBalance() < minimumBalance) {
            throw new InsufficientBalanceException(
                    "Initial balance must be at least ₹" + minimumBalance
            );
        }

        return accountRepository.save(account);
    }
   
    public Account getAccountById(Integer id) {

        return accountRepository.findById(id)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found with id: " + id
                        )
                );
    }
    
    public List<Account> getAllAccounts() {

        List<Account> accounts = accountRepository.findAll();

        if (accounts.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No accounts available"
            );
        }

        return accounts;
    }
    
    public Account getAccountByNumber(String accountNumber) {

        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found with number: " + accountNumber
                        )
                );
    }
    
    public List<Account> getAccountsByBank(Integer bankId) {

        Bank bank = bankRepository.findById(bankId)
                .orElseThrow(() ->
                        new BankNotFoundException(
                                "Bank not found with id: " + bankId
                        )
                );

        List<Account> accounts = accountRepository.findByBank(bank);

        if (accounts.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No accounts found for bank id: " + bankId
            );
        }

        return accounts;
    }
    
    public List<Account> getAccountsByType(AccountType accountType) {

        List<Account> accounts =
                accountRepository.findByAccountType(accountType);

        if (accounts.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No accounts found for type: " + accountType
            );
        }

        return accounts;
    }
    
    public List<Account> getAccountsWithBalanceGreaterThan(double amount) {

        List<Account> accounts =
                accountRepository.findByBalanceGreaterThan(amount);

        if (accounts.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No accounts found with balance greater than: " + amount
            );
        }

        return accounts;
    }
    
    @Transactional
    public Account depositAmount(DepositRequest request) {

        if (request.getAmount() <= 0) {
            throw new InvalidAmountException(
                    "Deposit amount must be greater than zero"
            );
        }

        Account account = accountRepository
                .findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found with number: "
                                        + request.getAccountNumber()
                        )
                );

        account.setBalance(account.getBalance() + request.getAmount());

        return accountRepository.save(account);
    }
    
    @Transactional
    public Account withdrawAmount(WithdrawRequest request) {

        if (request.getAmount() <= 0) {
            throw new InvalidAmountException(
                    "Withdrawal amount must be greater than zero"
            );
        }

        Account account = accountRepository
                .findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found with number: "
                                        + request.getAccountNumber()
                        )
                );

        double minimumBalance;

        switch (account.getAccountType()) {
            case SAVINGS:
                minimumBalance = 500;
                break;

            case CURRENT:
                minimumBalance = 1000;
                break;

            case FIXED_DEPOSIT:
                minimumBalance = 5000;
                break;

            default:
                minimumBalance = 0;
        }

        if (account.getBalance() - request.getAmount() < minimumBalance) {
            throw new InsufficientBalanceException(
                    "Insufficient balance. Minimum balance must be maintained"
            );
        }

        account.setBalance(
                account.getBalance() - request.getAmount()
        );

        return accountRepository.save(account);
    }
    
    @Transactional
    public void transferAmount(TransferRequest request) {

        if (request.getAmount() <= 0) {
            throw new InvalidAmountException(
                    "Transfer amount must be greater than zero"
            );
        }

        if (request.getSenderAccount()
                .equals(request.getReceiverAccount())) {

            throw new InvalidAmountException(
                    "Sender and receiver accounts cannot be the same"
            );
        }

        Account sender = accountRepository
                .findByAccountNumber(request.getSenderAccount())
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Sender account not found: "
                                        + request.getSenderAccount()
                        )
                );

        Account receiver = accountRepository
                .findByAccountNumber(request.getReceiverAccount())
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Receiver account not found: "
                                        + request.getReceiverAccount()
                        )
                );

        double minimumBalance;

        switch (sender.getAccountType()) {
            case SAVINGS:
                minimumBalance = 500;
                break;

            case CURRENT:
                minimumBalance = 1000;
                break;

            case FIXED_DEPOSIT:
                minimumBalance = 5000;
                break;

            default:
                minimumBalance = 0;
        }

        if (sender.getBalance() - request.getAmount()
                < minimumBalance) {

            throw new InsufficientBalanceException(
                    "Insufficient balance for transfer"
            );
        }

        sender.setBalance(
                sender.getBalance() - request.getAmount()
        );

        receiver.setBalance(
                receiver.getBalance() + request.getAmount()
        );

        accountRepository.save(sender);
        accountRepository.save(receiver);
    }
    
    @Transactional
    public void deleteAccount(Integer id) {

        Account account = accountRepository.findById(id)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found with id: " + id
                        )
                );

        accountRepository.delete(account);
    }
    
    public List<Account> getAccountsSorted(
            String field,
            String direction) {

        Sort sort;

        if (direction.equalsIgnoreCase("desc")) {
            sort = Sort.by(field).descending();
        } else {
            sort = Sort.by(field).ascending();
        }

        List<Account> accounts = accountRepository.findAll(sort);

        if (accounts.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No accounts available"
            );
        }

        return accounts;
    }
    
    public List<Account> getAccountsByBalanceGreaterThan(double amount) {

        List<Account> accounts =
                accountRepository.findByBalanceGreaterThan(amount);

        if (accounts.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No accounts found with balance greater than: " + amount
            );
        }

        return accounts;
    }
    
   
   
}


