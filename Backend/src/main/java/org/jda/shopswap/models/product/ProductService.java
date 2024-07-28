package org.jda.shopswap.models.product;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.models.category.Category;
import org.jda.shopswap.models.category.CategoryRepository;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;

@Service

@RequiredArgsConstructor
public class ProductService {
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);
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

    public void updateProduct(Long categoryID, Product product, String token) throws  AccessDeniedException{
        Category category = categoryRepository.findById(categoryID).orElseThrow();
        Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        User user = userRepository.findById(userId).orElseThrow();
        List<Product> products = productRepository.findAllByUser(user);
        log.info("Products: " + products);

        if(products.stream().noneMatch(p -> p.getId().equals(product.getId()))){
            throw new AccessDeniedException("El producto no pertenece al usuario");
        }
        Product newDataProduct = productRepository.findById(product.getId()).orElseThrow();
        newDataProduct.setName(product.getName());
        newDataProduct.setCategory(category);
        newDataProduct.setDescription(product.getDescription());
        newDataProduct.setPrice(product.getPrice());
        newDataProduct.setStock(product.getStock());
        newDataProduct.setTags(product.getTags());
        newDataProduct.setImgUrl(product.getImgUrl());
        newDataProduct.setModified(LocalDateTime.now());
        productRepository.save(newDataProduct);
    }
    public void deleteProductU(Long id, String authorization) throws AccessDeniedException {
        Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = userRepository.findById(userId).orElseThrow();
        List<Product> products = productRepository.findAllByUser(user);
        if (products.stream().noneMatch(p -> p.getId().equals(id))) {
            throw new AccessDeniedException("El producto no pertenece al usuario");
        }
        productRepository.deleteById(id);
    }
}
