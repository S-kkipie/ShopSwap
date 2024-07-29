package org.jda.shopswap.models.shoppingOrden;

import org.jda.shopswap.models.category.Category;
import org.jda.shopswap.models.product.Product;
import org.jda.shopswap.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingOrderRepository extends JpaRepository<ShoppingOrder, Long> {
    List<ShoppingOrder> findAllByUser(User user);

}
