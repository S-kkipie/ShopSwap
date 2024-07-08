package org.jda.shopswap.models.product;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.models.product.http.ProductRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin/models/product")
public class ProductControllerAdmin {
}
