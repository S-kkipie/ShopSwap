package org.jda.shopswap.models.product;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.models.product.http.ProductRequest;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/u/models/product")
public class ProductControllerU {
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody ProductRequest productRequest, @RequestHeader String authorization) {
        Long categoryID = productRequest.getCategory();
        Product product = productRequest.getProduct();
        Product newProduct = productService.createProduct(categoryID, product, authorization);
        if (newProduct == null) {
            return ResponseEntity.badRequest().body("Ocurrio un error al crear el producto");
        }
        return ResponseEntity.ok().body("Producto creado exitosamente.");
    }

    @GetMapping("/all")
    public List<Product> getAllProducts(@RequestHeader String authorization) {
        Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = userRepository.findById(userId).orElseThrow();
        return productRepository.findAllByUser(user);
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody ProductRequest productRequest, String authorization) {
        Long categoryID = productRequest.getCategory();
        Product product = productRequest.getProduct();
        try {
            productService.updateProduct(categoryID, product, authorization);
            return ResponseEntity.ok().body("Producto actualizado exitosamente.");
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body("El usuario no tiene permiso para actualizar este producto");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Ocurrio un error al actualizar el producto");
        }
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
