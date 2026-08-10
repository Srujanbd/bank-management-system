package jsp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepositRequest {

    @NotBlank(message = "Account number is required")
    private String accountNumber;

    @Positive(message = "Deposit amount must be greater than zero")
    private double amount;
}