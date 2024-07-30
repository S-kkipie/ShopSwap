package org.jda.shopswap.models.shoppingOrder;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(
        generator = ObjectIdGenerators.None.class,
        property = "id"
)
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


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> orderProducts;

    private double finalAmount;
    private LocalDateTime created;
    private LocalDateTime modified;
}