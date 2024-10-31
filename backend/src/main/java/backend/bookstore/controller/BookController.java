package backend.bookstore.controller;

import backend.bookstore.dto.request.BookCreateRequest;
import backend.bookstore.dto.request.BookUpdateRequest;
import backend.bookstore.dto.response.ApiResponse;
import backend.bookstore.dto.response.BookResponse;
import backend.bookstore.services.BookService;
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

}