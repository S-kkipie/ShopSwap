package org.jda.shopswap.models.productos;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.Jwt.JwtService;
import org.jda.shopswap.models.categorias.Categorias;
import org.jda.shopswap.models.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service

@RequiredArgsConstructor
public class ProductoService {
    @Autowired
    private final JwtService jwtService;
    private final ProductoRepository productoRepository;

    public Producto createProduct(User user, Categorias categorias, Producto producto) {

        Producto newProducto = Producto.builder()
                .categoria(categorias)
                .user(user)
                .productName(producto.getProductName())
                .created(LocalDateTime.now())
                .modified(LocalDateTime.now())
                .build();
        return productoRepository.save(newProducto);
    }

    public Producto updateProduct( Categorias categoryID, Producto producto, String token) {
        Long idUser = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        Producto newDataProduct = productoRepository.findByProductId(producto.getProductID()).orElseThrow();
        newDataProduct.setProductName(producto.getProductName());
        newDataProduct.setCategoria(categoryID);
        newDataProduct.setModified(LocalDateTime.now());
        return productoRepository.save(newDataProduct);
    }
}
