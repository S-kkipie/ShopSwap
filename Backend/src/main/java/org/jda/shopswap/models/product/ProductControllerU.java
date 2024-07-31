package org.jda.shopswap.models.product;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.models.product.http.ProductRequest;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/u/models/product")
public class ProductControllerU {
    private static final Logger log = LoggerFactory.getLogger(ProductControllerU.class);
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody ProductRequest productRequest, @RequestHeader String authorization) {
        Long categoryID = productRequest.getCategoryId();
        Product product = productRequest.getProduct();
        Product newProduct = productService.createProduct(categoryID, product, authorization);
        if (newProduct == null) {
            return ResponseEntity.badRequest().body("Ocurrio un error al crear el producto");
        }
        return ResponseEntity.ok().body("Producto creado exitosamente.");
    }

    @GetMapping("/myProducts")
    public List<Product> myProducts(@RequestHeader String authorization) {
        Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = userRepository.findById(userId).orElseThrow();
        return productRepository.findAllByUser(user);
    }

    @PutMapping("/update/{categoryId}")
    public ResponseEntity<String> update(@RequestBody Product product, @PathVariable Long categoryId,@RequestHeader String authorization) {
        try {
            productService.updateProduct(categoryId, product, authorization);
            return ResponseEntity.ok().body("Producto actualizado exitosamente.");
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id, @RequestHeader String authorization) {
        try {
            productService.deleteProductU(id, authorization);
            return ResponseEntity.ok().body("Producto eliminado exitosamente.");
        } catch (AccessDeniedException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PutMapping("/addReview")
    public ResponseEntity<Product> addReview(@RequestBody ProductReviewRequest productReviewRequest) {
        Product product = productRepository.findById(productReviewRequest.getProductId()).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        product.setReviews(product.getReviews() + 1);
        product.setRating((product.getRating() + productReviewRequest.getRating()) / product.getReviews());
        productRepository.save(product);
        return ResponseEntity.ok(product);
    }
}
