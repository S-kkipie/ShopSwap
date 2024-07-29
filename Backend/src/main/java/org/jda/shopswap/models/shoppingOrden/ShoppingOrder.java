package org.jda.shopswap.models.shoppingOrden;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jda.shopswap.models.payment.Payment;
import org.jda.shopswap.models.product.Product;
import org.jda.shopswap.models.user.User;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ShoppingOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;

    @ManyToOne
    @JoinColumn(name = "seller")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "costomer")
    private User userCostumer;

    @ManyToOne
    @JoinColumn(name = "product_ID")
    private Product product;

    private String status;
    private LocalDateTime created;
    private LocalDateTime modified;
}