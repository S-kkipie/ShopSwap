package org.jda.shopswap.models.productos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.jda.shopswap.models.categorias.Categorias;
import org.jda.shopswap.models.user.User;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
public class Productos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productID;

    @ManyToOne
    @JoinColumn(name = "category_ID")
    private Categorias categoria;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    private User user;

    private String productName;
    private LocalDateTime created;
    private LocalDateTime modified;

    // Getters and Setters
}