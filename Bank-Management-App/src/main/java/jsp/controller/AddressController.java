package jsp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jsp.dto.ResponseStructure;
import jsp.entity.Address;
import jsp.service.AddressService;

@RestController
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Address>> getAddressById(
            @PathVariable Integer id) {

        Address address = addressService.getAddressById(id);

        ResponseStructure<Address> response = new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Address fetched successfully");
        response.setData(address);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ResponseStructure<Address>> updateAddress(
            @PathVariable Integer id,
            @Valid @RequestBody Address updatedAddress) {

        Address address = addressService.updateAddress(id, updatedAddress);

        ResponseStructure<Address> response = new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Address updated successfully");
        response.setData(address);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<ResponseStructure<Address>> patchAddress(
            @PathVariable Integer id,
            @RequestBody @Valid Address updatedAddress) {

        Address address = addressService.patchAddress(id, updatedAddress);

        ResponseStructure<Address> response = new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Address updated successfully");
        response.setData(address);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/bank/{bankId}")
    public ResponseEntity<ResponseStructure<Address>> getAddressByBankId(
            @PathVariable Integer bankId) {

        Address address = addressService.getAddressByBankId(bankId);

        ResponseStructure<Address> response = new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Address fetched successfully");
        response.setData(address);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/city/{city}")
    public ResponseEntity<ResponseStructure<List<Address>>> getAddressesByCity(
            @PathVariable String city) {

        List<Address> addresses = addressService.getAddressesByCity(city);

        ResponseStructure<List<Address>> response = new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Addresses fetched successfully");
        response.setData(addresses);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/search")
    public ResponseEntity<ResponseStructure<Address>> searchAddress(
            @RequestParam String city,
            @RequestParam String street) {

        Address address = addressService.searchAddress(city, street);

        ResponseStructure<Address> response = new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Address found successfully");
        response.setData(address);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping
    public ResponseEntity<ResponseStructure<List<Address>>> getAllAddresses() {

        List<Address> addresses = addressService.getAllAddresses();

        ResponseStructure<List<Address>> response = new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Addresses fetched successfully");
        response.setData(addresses);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteAddress(
            @PathVariable Integer id) {

        addressService.deleteAddress(id);

        ResponseStructure<String> response = new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Address deleted successfully");
        response.setData(null);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}