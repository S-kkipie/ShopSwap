package org.jda.shopswap.models.product.http;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jda.shopswap.models.product.Product;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private Product product;
    private Long categoryId;
}
