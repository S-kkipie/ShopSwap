package org.jda.shopswap.models.product;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.models.category.Category;
import org.jda.shopswap.models.category.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/public/models/product")
public class ProductPublicController {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    @GetMapping("/findByCategory/{id}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        List<Product> products = productRepository.findAllByCategory(category);
        if (products == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);

    }
}
