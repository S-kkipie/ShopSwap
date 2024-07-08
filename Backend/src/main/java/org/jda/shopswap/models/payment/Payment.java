package org.jda.shopswap.models.payment;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jda.shopswap.models.product.Product;

import java.time.LocalDateTime;
@Getter
@Setter
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentID;

    @ManyToOne
    @JoinColumn(name = "product_ID")
    private Product product;

    private LocalDateTime created;
    private LocalDateTime modified;

}