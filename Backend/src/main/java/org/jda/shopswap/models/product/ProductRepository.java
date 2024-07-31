package org.jda.shopswap.models.product;

import org.jda.shopswap.models.category.Category;
import org.jda.shopswap.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByUser(User user);
    List<Product> findAllByCategory(Category category);
    List<Product> findAllByNameContaining(String name);
}
