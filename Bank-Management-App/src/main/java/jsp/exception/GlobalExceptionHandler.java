package jsp.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import jakarta.validation.ConstraintViolationException;
import jsp.dto.ResponseStructure;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	
	//404 not found
	@ExceptionHandler(IdNotFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleIdNotFound(
	        IdNotFoundException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.NOT_FOUND.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(BankNotFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleBankNotFound(
	        BankNotFoundException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.NOT_FOUND.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(AccountNotFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleAccountNotFound(
	        AccountNotFoundException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.NOT_FOUND.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(NoRecordsAvailableException.class)
	public ResponseEntity<ResponseStructure<String>> handleNoRecordsAvailable(
	        NoRecordsAvailableException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.NOT_FOUND.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
	
	
	//409 conflict
	
	@ExceptionHandler(DuplicateIFSCException.class)
	public ResponseEntity<ResponseStructure<String>> handleDuplicateIFSC(
	        DuplicateIFSCException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.CONFLICT.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(DuplicateContactNumberException.class)
	public ResponseEntity<ResponseStructure<String>> handleDuplicateContactNumber(
	        DuplicateContactNumberException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.CONFLICT.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(DuplicatePincodeException.class)
	public ResponseEntity<ResponseStructure<String>> handleDuplicatePincode(
	        DuplicatePincodeException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.CONFLICT.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(DuplicateAccountNumberException.class)
	public ResponseEntity<ResponseStructure<String>> handleDuplicateAccountNumber(
	        DuplicateAccountNumberException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.CONFLICT.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}
	
	//400 Bad Request Handler
	
	@ExceptionHandler(InvalidAmountException.class)
	public ResponseEntity<ResponseStructure<String>> handleInvalidAmount(
	        InvalidAmountException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.BAD_REQUEST.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(InsufficientBalanceException.class)
	public ResponseEntity<ResponseStructure<String>> handleInsufficientBalance(
	        InsufficientBalanceException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.BAD_REQUEST.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ActiveAccountExistsException.class)
	public ResponseEntity<ResponseStructure<String>> handleActiveAccountExists(
	        ActiveAccountExistsException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.BAD_REQUEST.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ValidationException.class)
	public ResponseEntity<ResponseStructure<String>> handleValidation(
	        ValidationException exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.BAD_REQUEST.value());
	    response.setMessage(exception.getMessage());
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
	
	//500 Internal Server ErrorHandler
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ResponseStructure<String>> handleGenericException(
	        Exception exception) {

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
	    response.setMessage("Something went wrong");
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseStructure<String>> handleValidationException(
	        MethodArgumentNotValidException exception) {

	    String message = exception.getBindingResult()
	            .getFieldErrors()
	            .stream()
	            .map(error -> error.getDefaultMessage())
	            .findFirst()
	            .orElse("Validation failed");

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.BAD_REQUEST.value());
	    response.setMessage(message);
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ResponseStructure<String>> handleConstraintViolation(
	        ConstraintViolationException exception) {

	    String message = exception.getConstraintViolations()
	            .stream()
	            .map(violation -> violation.getMessage())
	            .findFirst()
	            .orElse("Validation failed");

	    ResponseStructure<String> response = new ResponseStructure<>();

	    response.setStatusCode(HttpStatus.BAD_REQUEST.value());
	    response.setMessage(message);
	    response.setData(null);

	    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
}