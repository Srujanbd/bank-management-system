package jsp.service;

import java.util.List;

import org.springframework.stereotype.Service;
import jsp.entity.Bank;
import jsp.exception.BankNotFoundException;
import jsp.repository.AddressRepository;
import jsp.entity.Address;
import jsp.exception.IdNotFoundException;
import jsp.exception.NoRecordsAvailableException;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }
    
    public Address getAddressById(Integer id) {

        return addressRepository.findById(id)
                .orElseThrow(() ->
                        new IdNotFoundException(
                                "Address not found with id: " + id
                        )
                );
    }
    
    public Address updateAddress(Integer id, Address updatedAddress) {

        Address existingAddress = addressRepository.findById(id)
                .orElseThrow(() ->
                        new IdNotFoundException(
                                "Address not found with id: " + id
                        )
                );

        existingAddress.setStreet(updatedAddress.getStreet());
        existingAddress.setCity(updatedAddress.getCity());
        existingAddress.setState(updatedAddress.getState());
        existingAddress.setPincode(updatedAddress.getPincode());

        return addressRepository.save(existingAddress);
    }
    
    public Address patchAddress(Integer id, Address updatedAddress) {

        Address existingAddress = addressRepository.findById(id)
                .orElseThrow(() ->
                        new IdNotFoundException(
                                "Address not found with id: " + id
                        )
                );

        if (updatedAddress.getStreet() != null) {
            existingAddress.setStreet(updatedAddress.getStreet());
        }

        if (updatedAddress.getCity() != null) {
            existingAddress.setCity(updatedAddress.getCity());
        }

        if (updatedAddress.getState() != null) {
            existingAddress.setState(updatedAddress.getState());
        }

        if (updatedAddress.getPincode() != null) {
            existingAddress.setPincode(updatedAddress.getPincode());
        }

        return addressRepository.save(existingAddress);
    }
    
    public Address getAddressByBankId(Integer bankId) {

        Bank bank = new Bank();
        bank.setBankId(bankId);

        return addressRepository.findByBank(bank)
                .orElseThrow(() ->
                        new BankNotFoundException(
                                "Address not found for bank id: " + bankId
                        )
                );
    }
    
    public List<Address> getAddressesByCity(String city) {

        List<Address> addresses = addressRepository.findByCity(city);

        if (addresses.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No addresses found in city: " + city
            );
        }

        return addresses;
    }
    public Address searchAddress(String city, String street) {

        return addressRepository.findByCityAndStreet(city, street)
                .orElseThrow(() ->
                        new IdNotFoundException(
                                "Address not found for city: " + city
                                        + " and street: " + street
                        )
                );
    }
    
    public List<Address> getAllAddresses() {

        List<Address> addresses = addressRepository.findAll();

        if (addresses.isEmpty()) {
            throw new NoRecordsAvailableException(
                    "No addresses available"
            );
        }

        return addresses;
    }
    
    public void deleteAddress(Integer id) {

        Address address = addressRepository.findById(id)
                .orElseThrow(() ->
                        new IdNotFoundException(
                                "Address not found with id: " + id
                        )
                );

        addressRepository.delete(address);
    }
    
}