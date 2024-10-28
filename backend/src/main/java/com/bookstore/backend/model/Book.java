package com.bookstore.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Builder
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    Long bookId;
    @Column(name = "title")
    String title;
    @Column(name = "publisher_id")
    Long publisher;
    @Column(name = "publication_year")
    Long year;
    @Column(name = "price")
    BigDecimal price;
    @Column(name = "stock_quantity")
    Long stock;
    @Column(name = "description", columnDefinition = "TEXT")
    String description;
    @Column(name = "cover_image")
    String img;
    @Column(name = "sale")
    Long sale;
    @Column(name = "deleted")
    boolean deleted;
    @Column(name = "created_at")
    Date createdAt;
    @Column(name = "updated_at")
    Date modifiedAt;

    @ManyToMany
    @JoinTable(name = "book_categories",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
            @JsonBackReference
    Set<Category> categories;

}
