package com.bookstore.backend.repository;

import com.bookstore.backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    boolean existsByTitle(String title);

    @Query(value =  "SELECT DISTINCT books.*\n" +
            "FROM books\n" +
            "WHERE title LIKE %:keyword% \n" +
            "UNION \n" +
            "SELECT DISTINCT books.*\n" +
            "FROM books, publishers\n" +
            "WHERE books.publisher_id = publishers.publisher_id \n" +
            "AND publishers.name LIKE :keyword \n" +
            "UNION \n" +
            "SELECT DISTINCT books.*\n" +
            "FROM books, authors, book_authors\n" +
            "WHERE books.book_id = book_authors.book_id \n" +
            "AND book_authors.author_id = authors.author_id \n" +
            "AND authors.name LIKE %:keyword% \n" +
            "UNION\n" +
            "SELECT DISTINCT books.*\n" +
            "FROM books, categories, book_categories\n" +
            "WHERE books.book_id = book_categories.book_id \n" +
            "AND book_categories.category_id = categories.category_id \n" +
            "AND categories.name LIKE %:keyword% \n",nativeQuery = true)
    List<Book> search(@Param("keyword") String keyword);
}
