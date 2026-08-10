package jsp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PatchMapping;

import jsp.dto.DepositRequest;
import jsp.dto.ResponseStructure;
import jsp.dto.TransferRequest;
import jsp.dto.WithdrawRequest;
import jsp.entity.Account;
import jsp.enums.AccountType;
import jsp.service.AccountService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/accounts")
public class AccountController {
	
	private final AccountService accountService;

	public AccountController(AccountService accountService) {
	    this.accountService = accountService;
	}

	@PostMapping("/bank/{bankId}")
	public ResponseEntity<ResponseStructure<Account>> createAccount(
	        @PathVariable Integer bankId,
	        @Valid @RequestBody Account account) {

	    Account savedAccount =
	            accountService.createAccount(bankId, account);

	    ResponseStructure<Account> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.CREATED.value());
	    response.setMessage("Account created successfully");
	    response.setData(savedAccount);

	    return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseStructure<Account>> getAccountById(
	        @PathVariable Integer id) {

	    Account account = accountService.getAccountById(id);

	    ResponseStructure<Account> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Account fetched successfully");
	    response.setData(account);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<ResponseStructure<List<Account>>> getAllAccounts() {

	    List<Account> accounts = accountService.getAllAccounts();

	    ResponseStructure<List<Account>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Accounts fetched successfully");
	    response.setData(accounts);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/number/{number}")
	public ResponseEntity<ResponseStructure<Account>> getAccountByNumber(
	        @PathVariable String number) {

	    Account account = accountService.getAccountByNumber(number);

	    ResponseStructure<Account> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Account fetched successfully");
	    response.setData(account);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/bank/{bankId}")
	public ResponseEntity<ResponseStructure<List<Account>>> getAccountsByBank(
	        @PathVariable Integer bankId) {

	    List<Account> accounts = accountService.getAccountsByBank(bankId);

	    ResponseStructure<List<Account>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Accounts fetched successfully");
	    response.setData(accounts);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/type/{type}")
	public ResponseEntity<ResponseStructure<List<Account>>> getAccountsByType(
	        @PathVariable AccountType type) {

	    List<Account> accounts =
	            accountService.getAccountsByType(type);

	    ResponseStructure<List<Account>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Accounts fetched successfully");
	    response.setData(accounts);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}

	
	@GetMapping("/balance/greater/{amount}")
	public ResponseEntity<ResponseStructure<List<Account>>> getAccountsWithBalanceGreaterThan(
	        @PathVariable double amount) {

	    List<Account> accounts =
	            accountService.getAccountsWithBalanceGreaterThan(amount);

	    ResponseStructure<List<Account>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Accounts fetched successfully");
	    response.setData(accounts);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PatchMapping("/deposit")
	public ResponseEntity<ResponseStructure<Account>> depositAmount(
	        @Valid @RequestBody DepositRequest request) {

	    Account account = accountService.depositAmount(request);

	    ResponseStructure<Account> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Amount deposited successfully");
	    response.setData(account);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PatchMapping("/withdraw")
	public ResponseEntity<ResponseStructure<Account>> withdrawAmount(
	        @Valid @RequestBody WithdrawRequest request) {

	    Account account = accountService.withdrawAmount(request);

	    ResponseStructure<Account> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Amount withdrawn successfully");
	    response.setData(account);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PatchMapping("/transfer")
	public ResponseEntity<ResponseStructure<String>> transferAmount(
	        @Valid @RequestBody TransferRequest request) {

	    accountService.transferAmount(request);

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Amount transferred successfully");
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseStructure<String>> deleteAccount(
	        @PathVariable Integer id) {

	    accountService.deleteAccount(id);

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Account deleted successfully");
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/sort")
	public ResponseEntity<ResponseStructure<List<Account>>> getAccountsSorted(
	        @RequestParam(defaultValue = "accountId") String field,
	        @RequestParam(defaultValue = "asc") String direction) {

	    List<Account> accounts =
	            accountService.getAccountsSorted(field, direction);

	    ResponseStructure<List<Account>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Accounts sorted successfully");
	    response.setData(accounts);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/balance/{amount}")
	public ResponseEntity<ResponseStructure<List<Account>>> getAccountsByBalanceGreaterThan(
	        @PathVariable double amount) {

	    List<Account> accounts =
	            accountService.getAccountsByBalanceGreaterThan(amount);

	    ResponseStructure<List<Account>> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.OK.value());
	    response.setMessage("Accounts fetched successfully");
	    response.setData(accounts);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
}