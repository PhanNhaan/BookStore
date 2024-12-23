package com.bookstore.backend.dto.response;

import com.bookstore.backend.model.Category;
import com.bookstore.backend.model.Publisher;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookResponse {
    Long bookId;
    String title;
    Publisher publisher;
    Long year;
    BigDecimal price;
    Long stock;
    String description;
    String img;
    Long sale;
    Set<Category> categories;
}
