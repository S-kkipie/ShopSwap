package org.jda.shopswap.models.categorias;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jda.shopswap.models.productos.Productos;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
public class Categorias {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryID;

    private String categoryName;
    private String categoryType;
    private LocalDateTime modified;

    @OneToMany(mappedBy = "categoria")
    private Set<Productos> productos;

}