package org.jda.shopswap.models.shoppingOrden;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.models.user.UserRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
@Service

@RequiredArgsConstructor
public class ShoppingOrderService {
    private static final Logger log = LoggerFactory.getLogger(ShoppingOrderService.class);
    @Autowired
    private final JwtService jwtService;
    private final ShoppingOrderRepository shoppingOrderRepository;
    private final UserRepository userRepository;

    public ShoppingOrder createShoppingOrder(ShoppingOrder shoppingOrder, String authorization) {
        Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = userRepository.findById(userId).orElseThrow();
        ShoppingOrder newShoppingOrder = ShoppingOrder.builder()
                .seller(shoppingOrder.getSeller())
                .userCostumer(shoppingOrder.getUserCostumer())
                .product(product)
                .status(true)
                .;

    }
}
