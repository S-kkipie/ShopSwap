package org.jda.shopswap.models.shoppingOrder;

import jakarta.persistence.*;
import lombok.*;
import org.jda.shopswap.models.product.Product;
import org.jda.shopswap.models.user.User;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(
            name = "order_sellers",
            joinColumns = @JoinColumn(name = "order_id")
    )
    @Column(name = "seller_id")
    private List<Long> sellerIds;

    @Column(name = "customer_id")
    private Long customerId;

    @ManyToMany
    @JoinTable(
            name = "order_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;
    private double finalAmount;
    private LocalDateTime created;
    private LocalDateTime modified;
}