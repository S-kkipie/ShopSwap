package org.jda.shopswap.models.product.http;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jda.shopswap.models.product.Product;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private Long category;
    private Product product;
}
