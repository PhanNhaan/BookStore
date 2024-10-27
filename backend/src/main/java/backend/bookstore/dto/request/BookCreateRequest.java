package backend.bookstore.dto.request;

import backend.bookstore.model.Category;
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
public class BookCreateRequest {
//    Long bookId;
    String title;
    //    Long publisher;
    Long year;
    BigDecimal price;
    Long stock;
    String description;
    String img;
    Long sale;
    Set<Long> categories;
}
