package org.jda.shopswap.models.category;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin/models/category")
public class CategoryControllerAdmin {
    @Autowired
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestBody Category category, @RequestHeader String authorization) {
        Category newCategory = categoryService.createCategory(category, authorization);
        if (newCategory == null) {
            return ResponseEntity.badRequest().body("Ya hay una categoria con ese nombre");
        }
        return ResponseEntity.ok("Categoria creada exitosamente.");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category categoryData, @RequestHeader String authorization) {
            Category updatedCategory = categoryService.updateCategory(id, categoryData, authorization);
            if (updatedCategory == null) {
                return ResponseEntity.badRequest().body("Ya hay una categoria con ese nombre");
            }
            return ResponseEntity.ok("Categoria actualizada exitosamente.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }


}
