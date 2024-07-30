package org.jda.shopswap.models.shoppingOrder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductQuantity {
    Long productId;
    int quantity;
}
