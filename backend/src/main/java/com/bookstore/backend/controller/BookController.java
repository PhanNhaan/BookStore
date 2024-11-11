package com.bookstore.backend.controller;

import com.bookstore.backend.dto.request.BookCreateRequest;
import com.bookstore.backend.dto.request.BookUpdateRequest;
import com.bookstore.backend.dto.ApiResponse;
import com.bookstore.backend.dto.response.BookResponse;
import com.bookstore.backend.exception.AppException;
import com.bookstore.backend.exception.ErrorCode;
import com.bookstore.backend.services.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/book")
//@EnableCaching
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

    @GetMapping("/search")
    @Cacheable(value = "book", key = "'search:' + #search + ':' + #page + ':' + #limit")
    public ApiResponse<List<BookResponse>> searchBook(@RequestParam(name = "page", required = false,defaultValue = "1")int page,
                                                      @RequestParam(value = "search",required = false)String search,
                                                      @RequestParam(value = "limit",required = false,defaultValue = "10")int limit){
        var list = bookService.searchBook(page, search, limit);

        if (list == null || list.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND);
        }

        return ApiResponse.<List<BookResponse>>builder()
                .result(list)
                .build();
    }

    @GetMapping()
    @Cacheable(key = "'allbook'", value = "book")
    public ApiResponse<List<BookResponse>> getAllBooks(){
//        var books = bookService.getAllBooks();
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
    @Cacheable(value = "book", key = "'book:' + #bookId")
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
    @Cacheable(value = "book", key = "'category:' + #categoryName + ':' + #page + ':' + #limit")
    public ApiResponse<List<BookResponse>> getBooksByCategory(@PathVariable("categoryName") String categoryName,
                                                              @RequestParam(name = "page", required = false,defaultValue = "1")int page,
                                                              @RequestParam(value = "limit",required = false,defaultValue = "10")int limit){
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getBookCategories(categoryName, page, limit))
                .build();
    }

    @GetMapping("/publisher/{publisherName}")
    @Cacheable(value = "book", key = "'publisher:' + #publisherName + ':' + #page + ':' + #limit")
//    @Cacheable(value = "book", key = "#publisherName")
    public ApiResponse<List<BookResponse>> getBooksByPublisher(@PathVariable("publisherName") String publisherName,
                                                               @RequestParam(name = "page", required = false,defaultValue = "1")int page,
                                                               @RequestParam(value = "limit",required = false,defaultValue = "10")int limit){
        return ApiResponse.<List<BookResponse>>builder()
                .result(bookService.getBookPublishers(publisherName, page, limit))
                .build();
    }

}
