package jsp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jsp.entity.Address;
import jsp.entity.Bank;

public interface BankRepository extends JpaRepository<Bank, Integer> {

	Optional<Bank> findByIfscCode(String ifscCode);
	Optional<Bank> findByContactNumber(String contactNumber);
	
	Optional<Bank> findByAddress(Address address);

    Optional<Bank> findByAddressCity(String city);

    boolean existsByIfscCode(String ifscCode);

    boolean existsByContactNumber(String contactNumber);
    List<Bank> findByBranchName(String branchName);
}