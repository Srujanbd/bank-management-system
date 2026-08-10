package jsp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jsp.entity.Address;
import jsp.entity.Bank;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	
	
    List<Address> findByCity(String city);

    Optional<Address> findByCityAndStreet(String city, String street);

    boolean existsByPincode(String pincode);
    Optional<Address> findByBank(Bank bank);
}