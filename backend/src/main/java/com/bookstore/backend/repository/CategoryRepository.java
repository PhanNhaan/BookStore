package com.bookstore.backend.repository;

import com.bookstore.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryName(String name);
    Optional<Category> findByCategoryName(String name);
}
