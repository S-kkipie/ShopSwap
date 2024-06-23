package org.jda.shopswap.models.categorias;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriasRepository extends JpaRepository <Categorias,Long> {
    Optional<Categorias> findByCategoryId(Long categoryId);
    Optional<Categorias> findBycategoryType(String type);
    Optional<Categorias> findByCategoryName(String name);
}
