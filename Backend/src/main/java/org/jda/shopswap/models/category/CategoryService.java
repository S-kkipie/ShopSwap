package org.jda.shopswap.models.category;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final JwtService jwtService;
    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category, String token) {
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        Category newCategory = Category.builder()
                .name(category.getName())
                .description(category.getDescription())
                .adminID(adminId)
                .modified(LocalDateTime.now())
                .build();
        try {
            return categoryRepository.save(newCategory);
        } catch (Exception ex) {
            return null;
        }
    }

    public Category updateCategory(Long categoryId, Category category, String token) {
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        Category newDataCategory = categoryRepository.findById(categoryId).orElseThrow();
        newDataCategory.setName(category.getName());
        newDataCategory.setDescription(category.getDescription());
        newDataCategory.setAdminID(adminId);
        newDataCategory.setModified(LocalDateTime.now());
        try {
            return categoryRepository.save(newDataCategory);
        } catch (Exception ex) {
            return null;
        }
    }
}
