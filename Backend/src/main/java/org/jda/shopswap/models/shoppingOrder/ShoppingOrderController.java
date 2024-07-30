package org.jda.shopswap.models.shoppingOrder;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("u/models/shoppingOrder")
public class ShoppingOrderController {
    private final ShoppingOrderRepository shoppingOrderRepository;
    private final ShoppingOrderService shoppingOrderService;

    @PostMapping("/new")
    public ResponseEntity<ShoppingOrder> newShoppingOrder(@RequestBody List<ProductRequest> products, @RequestHeader String authorization) {
        ShoppingOrder shoppingOrder = shoppingOrderService.newShoppingOrder(products, authorization);
        if (shoppingOrder == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(shoppingOrder);
    }

    @GetMapping("/getOrdersBySeller")
    public ResponseEntity<List<ShoppingOrder>> getOrdersBySeller(@RequestHeader String authorization) {
        List<ShoppingOrder> shoppingOrdersList = shoppingOrderService.getOrdersBySeller(authorization);
        if (shoppingOrdersList == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(shoppingOrdersList);
    }

    @GetMapping("/getOrdersByCustomer")
    public ResponseEntity<List<ShoppingOrder>> getOrdersByCustomer(@RequestHeader String authorization) {
        List<ShoppingOrder> shoppingOrdersList = shoppingOrderService.getOrdersByCustomer(authorization);
        if (shoppingOrdersList == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(shoppingOrdersList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingOrder> getById(@PathVariable Long id, @RequestHeader String authorization) {
        ShoppingOrder shoppingOrder = shoppingOrderService.getById(id, authorization);
        if (shoppingOrder == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(shoppingOrder);
    }


}
