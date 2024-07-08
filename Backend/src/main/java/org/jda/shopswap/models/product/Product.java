package org.jda.shopswap.models.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.jda.shopswap.models.category.Category;
import org.jda.shopswap.models.user.User;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_ID")
    @JsonBackReference("category-product")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    @JsonBackReference("user-product")
    private User user;


    private String name;
    private String imgUrl;
    private double price;
    private String tags;
    private String description;
    private int stock;
    private int sold;
    private double rating;
    private LocalDateTime created;
    private LocalDateTime modified;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
}