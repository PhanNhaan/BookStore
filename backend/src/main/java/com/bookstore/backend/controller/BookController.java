package com.bookstore.backend.controller;

import com.bookstore.backend.dto.request.BookCreateRequest;
import com.bookstore.backend.dto.request.BookUpdateRequest;
import com.bookstore.backend.dto.response.ApiResponse;
import com.bookstore.backend.dto.response.BookResponse;
import com.bookstore.backend.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService bookService;

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<BookResponse> createBook(@RequestBody BookCreateRequest request){
        return ApiResponse.<BookResponse>builder()
                .result(bookService.createBook(request))
                .build();
    }

    @GetMapping()
    public ApiResponse<List<BookResponse>> getAllBooks(){
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getAllBooks())
                .build();
    }

    @GetMapping("/bookdeleted")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<BookResponse>> getAllBooksDeleted(){
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getBookDeleted())
                .build();
    }

    @GetMapping("/{bookId}")
    public ApiResponse<BookResponse> getBookById(@PathVariable("bookId") Long bookId){
        return ApiResponse.<BookResponse>builder()
                .result(bookService.getBookById(bookId))
                .build();
    }

    @DeleteMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> deleteBook(@RequestParam("id") Long bookId){
        bookService.deleteBookById(bookId);
        return ApiResponse.<String>builder()
                .result("Book has been deleted")
                .build();
    }

    @PutMapping("/softdelete")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> softDeleteBook(@RequestParam("id") Long bookId){
        bookService.softDeleteBookById(bookId);
        return ApiResponse.<String>builder()
                .result("Book has been deleted soft")
                .build();
    }

    @PutMapping("/restorebook")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> restoreBook(@RequestParam("id") Long bookId){
        bookService.restoreBookById(bookId);
        return ApiResponse.<String>builder()
                .result("Book has been restored")
                .build();
    }

    @PutMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<BookResponse> updateBook(@RequestBody BookUpdateRequest request){
        return ApiResponse.<BookResponse>builder()
                .result(bookService.updateBook(request))
                .build();
    }

    @GetMapping("/category/{categoryName}")
    public ApiResponse<List<BookResponse>> getBooksByCategory(@PathVariable("categoryName") String categoryName){
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getBookCategories(categoryName))
                .build();
    }

    @GetMapping("/publisher/{publisherName}")
    public ApiResponse<List<BookResponse>> getBooksByPublisher(@PathVariable("publisherName") String publisherName){
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getBookPublishers(publisherName))
                .build();
    }

}
