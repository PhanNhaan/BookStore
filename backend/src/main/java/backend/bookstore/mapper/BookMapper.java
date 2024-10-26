package backend.bookstore.mapper;

import backend.bookstore.dto.request.BookCreateRequest;
import backend.bookstore.dto.request.BookUpdateRequest;
import backend.bookstore.dto.response.BookResponse;
import backend.bookstore.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(target = "categories", ignore = true)
    Book toBook(BookCreateRequest request);
    @Mapping(target = "categories", ignore = true)
    Book updateBook(BookUpdateRequest request);

    BookResponse toBookResponse(Book book);

}
