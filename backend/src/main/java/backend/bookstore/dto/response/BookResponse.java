package backend.bookstore.dto.response;

import backend.bookstore.model.Category;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Date;
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
    Long publisher;
    Long year;
    BigDecimal price;
    Long stock;
    String description;
    String img;
    Long sale;
    Set<Category> categories;
}
