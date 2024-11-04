package backend.bookstore.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Builder
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    Long categoryId;
    @Column(name = "name")
    String categoryName;
    @Column(name = "description", columnDefinition = "TEXT")
    String categoryDescription;
    @Column(name = "created_at")
    Date createdAt;
    @Column(name = "updated_at")
    Date modifiedAt;

    @ManyToMany(mappedBy = "categories")
    @JsonBackReference
    Set<Book> books;
}
