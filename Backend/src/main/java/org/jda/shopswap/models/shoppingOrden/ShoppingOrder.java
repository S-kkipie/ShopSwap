package org.jda.shopswap.models.shoppingOrden;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jda.shopswap.models.payment.Payment;
import org.jda.shopswap.models.productos.Productos;
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
    @JoinColumn(name = "payment_ID")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_ID")
    private Productos producto;

    private String status;
    private LocalDateTime created;
    private LocalDateTime modified;
}