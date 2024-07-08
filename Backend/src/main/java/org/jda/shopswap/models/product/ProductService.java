package org.jda.shopswap.models.product;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.models.category.Category;
import org.jda.shopswap.models.category.CategoryRepository;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;

@Service

@RequiredArgsConstructor
public class ProductService {
    @Autowired
    private final JwtService jwtService;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public Product createProduct(Long categoryID, Product product, String authorization) {
        Category category = categoryRepository.findById(categoryID).orElseThrow();
        Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = userRepository.findById(userId).orElseThrow();
        Product newProduct = Product.builder()
                .category(category)
                .user(user)
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .sold(0)
                .rating(0)
                .tags(product.getTags())
                .imgUrl(product.getImgUrl())
                .created(LocalDateTime.now())
                .modified(LocalDateTime.now())
                .build();
        return productRepository.save(newProduct);
    }

    public void updateProduct(Long categoryID, Product product, String token) throws AccessDeniedException, IllegalArgumentException{
        Category category = categoryRepository.findById(categoryID).orElseThrow();
        Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        User user = userRepository.findById(userId).orElseThrow();
        if(!product.getUser().equals(user)){
            throw new AccessDeniedException("El usuario no tiene permiso para actualizar este producto");
        }
        Product newDataProduct = productRepository.findById(product.getId()).orElseThrow();
        newDataProduct.setCategory(category);
        newDataProduct.setDescription(product.getDescription());
        newDataProduct.setPrice(product.getPrice());
        newDataProduct.setStock(product.getStock());
        newDataProduct.setTags(product.getTags());
        newDataProduct.setImgUrl(product.getImgUrl());
        newDataProduct.setModified(LocalDateTime.now());
        productRepository.save(newDataProduct);
    }
}
