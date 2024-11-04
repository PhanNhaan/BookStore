package com.bookstore.backend.model;

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
@Entity(name = "publishers")
public class Publisher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "publisher_id")
    Long publisherId;
    @Column(name = "name")
    String publisherName;
    @Column(name = "address")
    String publisherAddress;
    @Column(name = "website")
    String publisherWebsite;
    @Column(name = "created_at")
    Date createdAt;
    @Column(name = "updated_at")
    Date modifiedAt;

    @OneToMany(mappedBy = "publisher")
    @JsonBackReference
    Set<Book> books;
}
