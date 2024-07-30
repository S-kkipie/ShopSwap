package org.jda.shopswap.models.shoppingOrder;

import org.jda.shopswap.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShoppingOrderRepository extends JpaRepository<ShoppingOrder, Long> {
    List<ShoppingOrder> findBySellerIdsContaining(Long sellerId);
    List<ShoppingOrder> findByCustomerId(Long customerId);
}