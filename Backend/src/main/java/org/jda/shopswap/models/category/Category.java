package org.jda.shopswap.models.category;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.jda.shopswap.models.product.Product;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryID;

    @Column(nullable = false, unique = true)
    private String name;
    private String description;
    private Long adminID;
    private LocalDateTime modified;
    @OneToMany(mappedBy = "category")
    @JsonManagedReference("category-product")
    private Set<Product> products;

}