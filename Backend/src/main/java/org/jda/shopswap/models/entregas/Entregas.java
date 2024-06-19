package org.jda.shopswap.models.entregas;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jda.shopswap.models.transactionReport.TransactionReport;
import org.jda.shopswap.models.user.User;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Entregas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryID;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "transaction_ID")
    private TransactionReport transactionReport;

    private LocalDateTime created;
    private LocalDateTime modified;

    // Getters and Setters
}