package org.jda.shopswap.models.categorias;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.jda.shopswap.Jwt.JwtService;
import org.jda.shopswap.models.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CategoriasService {
    @Autowired
    private final JwtService jwtService;
    private final CategoriasRepository categoriasRepo;

    public Categorias createCategorias(Categorias categorias, String token) {
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        Categorias newCategoria = Categorias.builder()
                .categoryName(categorias.getCategoryName())
                .categoryType(categorias.getCategoryType())
                .adminID(adminId)
                .modified(LocalDateTime.now())
                .build();
        return categoriasRepo.save(newCategoria);
    }
    public Categorias updateCategorias(Long categoryId , Categorias categorias, String token) {
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        Categorias newDataCategory = categoriasRepo.findByCategoryID(categoryId).orElseThrow();
        newDataCategory.setCategoryName(categorias.getCategoryName());
        newDataCategory.setCategoryType(categorias.getCategoryType());
        newDataCategory.setAdminID(adminId);
        newDataCategory.setModified(LocalDateTime.now());
        return categoriasRepo.save(newDataCategory);
    }
}
