package jsp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import jsp.entity.Address;
import jsp.entity.Bank;
import jsp.exception.ActiveAccountExistsException;
import jsp.exception.BankNotFoundException;
import jsp.exception.DuplicateContactNumberException;
import jsp.exception.DuplicateIFSCException;
import jsp.exception.IdNotFoundException;
import jsp.exception.NoRecordsAvailableException;
import jsp.repository.AccountRepository;
import jsp.repository.AddressRepository;
import jsp.repository.BankRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


@Service
public class BankService {

    private final BankRepository bankRepository;
    
    private final AddressRepository addressRepository;
    
    private final AccountRepository accountRepository;

    public BankService(BankRepository bankRepository,
            AddressRepository addressRepository,
            AccountRepository accountRepository) {

this.bankRepository = bankRepository;
this.addressRepository = addressRepository;
this.accountRepository = accountRepository;
}
    
    public Bank createBank(Bank bank) {

        if (bankRepository.existsByIfscCode(bank.getIfscCode())) {
            throw new DuplicateIFSCException(
                    "IFSC code already exists: " + bank.getIfscCode()
            );
        }

        if (bankRepository.existsByContactNumber(bank.getContactNumber())) {
            throw new DuplicateContactNumberException(
                    "Contact number already exists: " + bank.getContactNumber()
            );
        }

        return bankRepository.save(bank);
    }
    
    public List<Bank> getAllBanks() {

        List<Bank> banks = bankRepository.findAll();

        if (banks.isEmpty()) {
            throw new NoRecordsAvailableException("No banks available");
        }

        return banks;
    }
    public Bank getBankById(Integer id) {

        return bankRepository.findById(id)
                .orElseThrow(() ->
                        new BankNotFoundException(
                                "Bank not found with id: " + id
                        )
                );
    }
    
    @Transactional
    public void deleteBank(Integer id) {

        Bank bank = bankRepository.findById(id)
                .orElseThrow(() ->
                        new IdNotFoundException(
                                "Bank not found with id: " + id
                        )
                );

        if (bank.getAccounts() != null &&
                !bank.getAccounts().isEmpty()) {

            throw new ActiveAccountExistsException(
                    "Bank cannot be deleted because active accounts exist"
            );
        }

        bankRepository.delete(bank);
    }
    public Bank getBankByIfsc(String ifsc) {

        return bankRepository.findByIfscCode(ifsc)
                .orElseThrow(() ->
                        new BankNotFoundException(
                                "Bank not found with IFSC: " + ifsc
                        )
                );
    }
    
    public Bank getBankByAddress(Address address) {

        return bankRepository.findByAddress(address)
                .orElseThrow(() ->
                        new BankNotFoundException(
                                "Bank not found for the given address"
                        )
                );
    }
    public Bank getBankByCity(String city) {

        return bankRepository.findByAddressCity(city)
                .orElseThrow(() ->
                        new BankNotFoundException(
                                "Bank not found in city: " + city
                        )
                );
    }
    
    public Bank getBankByContactNumber(String contactNumber) {

        return bankRepository.findByContactNumber(contactNumber)
                .orElseThrow(() ->
                        new BankNotFoundException(
                                "Bank not found with contact number: " + contactNumber
                        )
                );
    }
    public Page<Bank> getBanksWithPagination(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Bank> banks = bankRepository.findAll(pageable);

        if (banks.isEmpty()) {
            throw new NoRecordsAvailableException("No banks available");
        }

        return banks;
    }
    
    public List<Bank> getBanksSorted(String field, String direction) {

        Sort sort;

        if (direction.equalsIgnoreCase("desc")) {
            sort = Sort.by(field).descending();
        } else {
            sort = Sort.by(field).ascending();
        }

        List<Bank> banks = bankRepository.findAll(sort);

        if (banks.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No banks available"
            );
        }

        return banks;
    }
    
    public List<Bank> getBanksByBranch(String branchName) {

        List<Bank> banks =
                bankRepository.findByBranchName(branchName);

        if (banks.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No banks found for branch: " + branchName
            );
        }

        return banks;
    }
    
    public Bank updateBank(Integer id, Bank updatedBank) {

        Bank existingBank = bankRepository.findById(id)
                .orElseThrow(() ->
                        new IdNotFoundException(
                                "Bank not found with id: " + id
                        )
                );

        existingBank.setBankName(updatedBank.getBankName());
        existingBank.setIfscCode(updatedBank.getIfscCode());
        existingBank.setBranchName(updatedBank.getBranchName());
        existingBank.setContactNumber(updatedBank.getContactNumber());

        return bankRepository.save(existingBank);
    }
    
    public Bank patchBank(Integer id, Bank updatedBank) {

        Bank existingBank = bankRepository.findById(id)
                .orElseThrow(() ->
                        new IdNotFoundException(
                                "Bank not found with id: " + id
                        )
                );

        if (updatedBank.getBankName() != null) {
            existingBank.setBankName(updatedBank.getBankName());
        }

        if (updatedBank.getIfscCode() != null) {
            existingBank.setIfscCode(updatedBank.getIfscCode());
        }

        if (updatedBank.getBranchName() != null) {
            existingBank.setBranchName(updatedBank.getBranchName());
        }

        if (updatedBank.getContactNumber() != null) {
            existingBank.setContactNumber(updatedBank.getContactNumber());
        }

        return bankRepository.save(existingBank);
    }
    
    
}

