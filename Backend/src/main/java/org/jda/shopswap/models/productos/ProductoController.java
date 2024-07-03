package org.jda.shopswap.models.productos;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.models.categorias.Categorias;
import org.jda.shopswap.models.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/models/productos")
public class ProductoController {
    @Autowired
    private final ProductoRepository productoRepository;
    private final ProductoService productoService;

    @PostMapping("/createProduct")
    public ResponseEntity createProduct(User user , @RequestBody Categorias categoryID , @RequestBody Producto producto) {
        Producto productos = productoService.createProduct(user, categoryID , producto);
        if (productos == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(producto);
    }
    @GetMapping("/all")
    public List<Producto> getAllProducts() {
        return productoRepository.findAll();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity updateProduct( @RequestBody Categorias categoryID , @RequestBody Producto producto, String authorization) {
        try{
            Producto updateProducto = productoService.updateProduct(categoryID, producto, authorization);
            return ResponseEntity.ok().body(updateProducto);
        }catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @DeleteMapping("delete/{id}")
    public void deteleProduct(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }
}
