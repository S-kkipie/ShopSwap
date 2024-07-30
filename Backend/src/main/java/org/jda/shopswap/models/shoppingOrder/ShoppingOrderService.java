package org.jda.shopswap.models.shoppingOrder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.models.product.Product;
import org.jda.shopswap.models.product.ProductRepository;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShoppingOrderService {
    private final ShoppingOrderRepository shoppingOrderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public List<ShoppingOrder> getOrdersBySeller(String auth) {
        User seller = userRepository.findById(jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(auth))).orElse(null);
        if (seller == null) {
            return null;
        }
        return shoppingOrderRepository.findBySellerIdsContaining(seller.getId());
    }

    public List<ShoppingOrder> getOrdersByCustomer(String auth) {
        User customer = userRepository.findById(jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(auth))).orElse(null);
        if (customer == null) {
            return null;
        }
        return shoppingOrderRepository.findByCustomerId(customer.getId());
    }

    public ShoppingOrder newShoppingOrder(List<ProductQuantity> products, String authorization) {
        User customer = userRepository.findById(jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization))).orElse(null);
        if (customer == null) {
            return null;
        }
        List<Product> productList = new ArrayList<>();
        List<Long> sellersList = new ArrayList<>();
        double moneyAmount = 0.0;
        for (ProductQuantity productQuantity : products) {
            Product product = productRepository.findById(productQuantity.getProductId()).orElse(null);
            if (product == null) {
                return null;
            }
            product.setSold(product.getSold() + productQuantity.getQuantity());
            product.setStock(Math.max(product.getStock() - productQuantity.getQuantity(), 0));
            productList.add(product);
            User seller = userRepository.findById(product.getUserId()).orElse(null);
            if (seller == null) {
                return null;
            }
            seller.setMoney(seller.getMoney() + productQuantity.getQuantity() * product.getPrice());
            if (!sellersList.contains(seller.getId())) {
                sellersList.add(seller.getId());
            }
            moneyAmount += productQuantity.getQuantity() * product.getPrice();
        }
        if (customer.getMoney() < moneyAmount) {
            return null;
        }
        customer.setMoney(customer.getMoney() - moneyAmount);
        return shoppingOrderRepository.save(ShoppingOrder.builder()
                .created(LocalDateTime.now())
                .modified(LocalDateTime.now())
                .customerId(customer.getId())
                .sellerIds(sellersList)
                .products(productList)
                .finalAmount(moneyAmount)
                .build());
    }

    public ShoppingOrder getById(Long id,String authorization) {
        User user = userRepository.findById(jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization))).orElse(null);
        if(user == null){
            log.info("User not found");
            return null;
        }
        ShoppingOrder shoppingOrder = shoppingOrderRepository.findById(id).orElse(null);
        if(shoppingOrder == null){
            log.info("Order not found");
            return null;
        }
        if (!user.getId().equals(shoppingOrder.getCustomerId())) {
            return null;
        }
        return shoppingOrder;
    }
}
