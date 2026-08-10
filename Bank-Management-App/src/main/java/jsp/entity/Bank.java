package jsp.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "banks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bankId;
    @NotBlank(message = "Bank name is required")
    @Column(nullable = false)
    private String bankName;

    @NotBlank(message = "IFSC code is required")
    @Column(unique = true, nullable = false)
    private String ifscCode;

    @NotBlank(message = "Branch name is required")
    @Column(nullable = false)
    private String branchName;

    @NotBlank(message = "Contact number is required")
    @Pattern(
            regexp = "\\d{10}",
            message = "Contact number must contain exactly 10 digits"
    )
    @Column(unique = true, nullable = false, length = 10)
    private String contactNumber;

    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "address_id")
    @JsonIgnoreProperties("bank")
    private Address address;

    @OneToMany(
            mappedBy = "bank",
            cascade = CascadeType.ALL
    )
    @JsonIgnoreProperties("bank")
    private List<Account> accounts;
}