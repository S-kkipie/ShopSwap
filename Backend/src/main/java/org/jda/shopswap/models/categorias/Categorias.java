package org.jda.shopswap.models.categorias;


import jakarta.persistence.*;
import lombok.*;
import org.jda.shopswap.models.productos.Productos;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorias {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryID;

    private String categoryName;
    private String categoryType;
    private Long adminID;
    private LocalDateTime modified;

    @OneToMany(mappedBy = "categoria")
    private Set<Productos> productos;

}