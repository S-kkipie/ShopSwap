package org.jda.shopswap.models.product;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.models.category.Category;
import org.jda.shopswap.models.category.CategoryRepository;
import org.jda.shopswap.models.product.http.ProductRequest;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin/models/product")
public class ProductControllerAdmin {
    private final ProductRepository productRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    

    @PutMapping("/update/{categoryID}")
    public ResponseEntity<String> update( @RequestBody Product product, @PathVariable Long categoryID) {
        Category category = categoryRepository.findById(categoryID).orElseThrow();
        Product productSave = productRepository.findById(product.getId()).orElse(null);
        if(productSave == null){
            return ResponseEntity.badRequest().body("El producto no existe");
        }
        productSave.setName(product.getName());
        productSave.setCategory(category);
        productSave.setDescription(product.getDescription());
        productSave.setPrice(product.getPrice());
        productSave.setStock(product.getStock());
        productSave.setTags(product.getTags());
        productSave.setImgUrl(product.getImgUrl());
        productSave.setModified(LocalDateTime.now());
        productRepository.save(productSave);
        return ResponseEntity.ok().body("Producto actualizado exitosamente.");
    }

}
