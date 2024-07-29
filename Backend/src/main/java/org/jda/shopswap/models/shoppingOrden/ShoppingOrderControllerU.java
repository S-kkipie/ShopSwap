package org.jda.shopswap.models.shoppingOrden;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.models.product.ProductService;
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
public class ShoppingOrderControllerU {
    private static final Logger log = LoggerFactory.getLogger(ShoppingOrderControllerU.class);
    private final ShoppingOrderRepository shoppingOrderRepository;
    private final ShoppingOrderService shoppingOrderService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody ShoppingOrder shoppingOrder, @RequestHeader String authorization) {
        Long shoppingOrderID = shoppingOrderRequest.getShoppingOrderId();
        ShoppingOrder shoppingOrder = ShoppingOrderRequest.getShoppingOrder();
        ShoppingOrder newShoppingOrder = ShoppingOrderService.createShoppingOrder(shoppingOrder, authorization);
        if (newShoppingOrder == null) {
            return ResponseEntity.badRequest().body("Ocurrio un error al crear la orden");
        }
        return  ResponseEntity.ok().body("Orden de producto creado exitosamente.");
    }
    @GetMapping("/myShoppingOrder")
    public List<ShoppingOrder> myShoppingOrder(@RequestHeader String authorization) {
        Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = userRepository.findById(userId).orElseThrow();
        return ShoppingOrderRepository.findAllByUser(user);
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody ShoppingOrder shoppingOrder, @RequestHeader String authorization) {
        try{
            shoppingOrderService.updateProduct(shoppingOrder,authorization);
            return ResponseEntity.ok().body("Orden de producto actualizado.");
        }catch (AccessDeniedException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id, @RequestHeader String authorization) {
        try{
            shoppingOrderService.deleteProductU(id, authorization);
            return ResponseEntity.ok().body("Orden de producto eliminado exitosamente.");
        }catch (AccessDeniedException ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
