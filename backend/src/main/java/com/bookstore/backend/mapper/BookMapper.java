package com.bookstore.backend.mapper;

import com.bookstore.backend.dto.request.BookCreateRequest;
import com.bookstore.backend.dto.request.BookUpdateRequest;
import com.bookstore.backend.dto.response.BookResponse;
import com.bookstore.backend.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "publisher", ignore = true)
    Book toBook(BookCreateRequest request);
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "publisher", ignore = true)
    Book updateBook(BookUpdateRequest request);

    BookResponse toBookResponse(Book book);

}
