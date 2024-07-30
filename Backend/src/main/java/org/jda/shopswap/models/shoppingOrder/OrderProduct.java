package org.jda.shopswap.models.shoppingOrder;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;
import org.jda.shopswap.models.product.Product;

@Entity
@Table(name = "order_products")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private ShoppingOrder order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonSerialize
    private Product product;

    @Column(nullable = false)
    private int quantity;

    @JsonProperty("order_id")
    public Long getOrderId() {
        return order != null ? order.getId() : null;
    }

    @JsonProperty("product")
    public Product getProduct() {
        return this.product;
    }

}