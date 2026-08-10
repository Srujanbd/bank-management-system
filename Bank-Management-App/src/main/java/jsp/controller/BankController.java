package jsp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import jsp.service.BankService;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jsp.dto.ResponseStructure;
import jsp.entity.Address;
import jsp.entity.Bank;

@RestController
@RequestMapping("/banks")
public class BankController {
	
	private final BankService bankService;

	public BankController(BankService bankService) {
	    this.bankService = bankService;
	}
	
	@PostMapping
	public ResponseEntity<ResponseStructure<Bank>> createBank(
			@RequestBody @Valid Bank bank) {

	    Bank savedBank = bankService.createBank(bank);

	    ResponseStructure<Bank> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.CREATED.value());
	    response.setMessage("Bank created successfully");
	    response.setData(savedBank);

	    return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<ResponseStructure<List<Bank>>> getAllBanks() {

	    List<Bank> banks = bankService.getAllBanks();

	    ResponseStructure<List<Bank>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Banks fetched successfully");
	    response.setData(banks);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/{id:\\d+}")
	public ResponseEntity<ResponseStructure<Bank>> getBankById(
	        @PathVariable Integer id) {

	    Bank bank = bankService.getBankById(id);

	    ResponseStructure<Bank> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Bank fetched successfully");
	    response.setData(bank);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id:\\d+}")

	public ResponseEntity<ResponseStructure<String>> deleteBank(
	        @PathVariable Integer id) {

	    bankService.deleteBank(id);

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Bank deleted successfully");
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/ifsc/{ifsc}")
	public ResponseEntity<ResponseStructure<Bank>> getBankByIfsc(
	        @PathVariable String ifsc) {

	    Bank bank = bankService.getBankByIfsc(ifsc);

	    ResponseStructure<Bank> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Bank fetched successfully");
	    response.setData(bank);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/address")
	public ResponseEntity<ResponseStructure<Bank>> getBankByAddress(
	        @RequestBody Address address) {

	    Bank bank = bankService.getBankByAddress(address);

	    ResponseStructure<Bank> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Bank fetched successfully");
	    response.setData(bank);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/city/{city}")
	public ResponseEntity<ResponseStructure<Bank>> getBankByCity(
	        @PathVariable String city) {

	    Bank bank = bankService.getBankByCity(city);

	    ResponseStructure<Bank> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Bank fetched successfully");
	    response.setData(bank);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/contact/{number}")
	public ResponseEntity<ResponseStructure<Bank>> getBankByContactNumber(
	        @PathVariable String number) {

	    Bank bank = bankService.getBankByContactNumber(number);

	    ResponseStructure<Bank> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Bank fetched successfully");
	    response.setData(bank);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}

	
	@GetMapping("/page")
	public ResponseEntity<ResponseStructure<Page<Bank>>> getBanksWithPagination(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        @RequestParam(defaultValue = "bankName") String sortBy,
	        @RequestParam(defaultValue = "asc") String direction) {

	    Page<Bank> banks = bankService.getBanksWithPagination(
	            page, size, sortBy, direction);

	    ResponseStructure<Page<Bank>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Banks fetched successfully");
	    response.setData(banks);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/sort")
	public ResponseEntity<ResponseStructure<List<Bank>>> getBanksSorted(
	        @RequestParam(defaultValue = "bankName") String field,
	        @RequestParam(defaultValue = "asc") String direction) {

	    List<Bank> banks =
	            bankService.getBanksSorted(field, direction);

	    ResponseStructure<List<Bank>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Banks sorted successfully");
	    response.setData(banks);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/branch/{branchName}")
	public ResponseEntity<ResponseStructure<List<Bank>>> getBanksByBranch(
	        @PathVariable String branchName) {

	    List<Bank> banks =
	            bankService.getBanksByBranch(branchName);

	    ResponseStructure<List<Bank>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Banks fetched successfully");
	    response.setData(banks);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PutMapping("/{id:\\d+}")
	public ResponseEntity<ResponseStructure<Bank>> updateBank(
	        @PathVariable Integer id,
	        @Valid @RequestBody Bank updatedBank) {

	    Bank bank = bankService.updateBank(id, updatedBank);

	    ResponseStructure<Bank> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Bank updated successfully");
	    response.setData(bank);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PatchMapping("/{id:\\d+}")
	public ResponseEntity<ResponseStructure<Bank>> patchBank(
	        @PathVariable Integer id,
	        @RequestBody Bank updatedBank) {

	    Bank bank = bankService.patchBank(id, updatedBank);

	    ResponseStructure<Bank> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Bank updated successfully");
	    response.setData(bank);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
}
