package org.jda.shopswap.models.transactionReport;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jda.shopswap.models.payment.Payment;
import org.jda.shopswap.models.product.Product;
import org.jda.shopswap.models.shoppingOrder.ShoppingOrder;
import org.jda.shopswap.models.user.User;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class TransactionReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportID;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "order_ID")
    private ShoppingOrder order;

    @ManyToOne
    @JoinColumn(name = "product_ID")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "payment_ID")
    private Payment payment;

    private LocalDateTime created;
    private LocalDateTime modified;

    // Getters and Setters
}