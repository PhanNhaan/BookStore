package com.bookstore.backend.services;

import com.bookstore.backend.dto.request.BookCreateRequest;
import com.bookstore.backend.dto.request.BookUpdateRequest;
import com.bookstore.backend.dto.response.BookResponse;
import com.bookstore.backend.exception.AppException;
import com.bookstore.backend.exception.ErrorCode;
import com.bookstore.backend.mapper.BookMapper;
import com.bookstore.backend.model.Book;
import com.bookstore.backend.model.Publisher;
import com.bookstore.backend.repository.BookRepository;
import com.bookstore.backend.repository.CategoryRepository;
import com.bookstore.backend.repository.PublisherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private PublisherRepository publisherRepository;

    public BookResponse createBook(BookCreateRequest request){
        if (bookRepository.existsByTitle(request.getTitle())){
            throw new AppException(ErrorCode.BOOK_EXISTED);
        }
        Book book = bookMapper.toBook(request);

        var categories = categoryRepository.findAllById(request.getCategories());

        if (categories.isEmpty()) throw new AppException(ErrorCode.NOT_HAVE_CATRGORY);

        book.setCategories(new HashSet<>(categories));

        if (request.getPublisher() == null) throw new AppException(ErrorCode.NOT_HAVE_PUBLISHER);

        var publisher = publisherRepository.findById(request.getPublisher()).orElseThrow(
                () -> new AppException(ErrorCode.PUBLISHER_NOT_EXISTED)
        );
        book.setPublisher(publisher);

        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    public BookResponse getBookById(Long id){
        var book = bookRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.BOOK_NOT_EXISTED));

        return bookMapper.toBookResponse(book);
    }

    public List<BookResponse> searchBook(int page, String search, int limit){
        if(page<1) return null;
        int offset = (page - 1) * limit;
        return bookRepository.search(search).stream().filter(book-> !book.isDeleted()).skip(offset).limit(limit).map(bookMapper::toBookResponse).toList();
    }

    public List<BookResponse> getAllBooks(){
//        var books = bookRepository.findAll();
//        log.info("getAllBooks");
        return bookRepository.findAll().stream().filter(book-> !book.isDeleted()).map(bookMapper::toBookResponse).toList();
    }

    public List<BookResponse> getBookDeleted(){
        return bookRepository.findAll().stream().filter(Book::isDeleted).map(bookMapper::toBookResponse).toList();
    }

    public void deleteBookById(Long id){
        var book = bookRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.BOOK_NOT_EXISTED)
        );

        book.getCategories().remove(this);
        bookRepository.save(book);

        bookRepository.deleteById(id);
    }

    public void softDeleteBookById(Long id){
        var book = bookRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.BOOK_NOT_EXISTED)
        );

        if (book.isDeleted()){
            throw new AppException(ErrorCode.BOOK_DELETED);
        }

        book.setDeleted(true);
        bookRepository.save(book);
    }

    public void restoreBookById(Long id){
        var book = bookRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.BOOK_NOT_EXISTED)
        );

        if (!book.isDeleted()){
            throw new AppException(ErrorCode.BOOK_NOT_DELETED);
        }

        book.setDeleted(false);
        bookRepository.save(book);
    }

    public BookResponse updateBook(BookUpdateRequest request){
        if (!bookRepository.existsById(request.getBookId())){
            throw new AppException(ErrorCode.BOOK_NOT_EXISTED);
        }
        var book = bookMapper.updateBook(request);

        var categories = categoryRepository.findAllById(request.getCategories());

        if (categories.isEmpty()) throw new AppException(ErrorCode.NOT_HAVE_CATRGORY);

        book.setCategories(new HashSet<>(categories));

//        HashSet<Category> categories = new HashSet<>();
//        categoryRepository.findById(request.getCategories()).ifPresent(categories::add);

        if (request.getPublisher() == null) throw new AppException(ErrorCode.NOT_HAVE_PUBLISHER);

        var publisher = publisherRepository.findById(request.getPublisher()).orElseThrow(
                () -> new AppException(ErrorCode.PUBLISHER_NOT_EXISTED)
        );
        book.setPublisher(publisher);


        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    public List<BookResponse> getBookCategories(String categorieName, int page, int limit){
//        HashSet<Book> books = new HashSet<>();
        if(page<1) return null;
        int offset = (page - 1) * limit;
        var category = categoryRepository.findByCategoryName(categorieName).orElseThrow(
                () -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        var books = category.getBooks();

        return books.stream().filter(book-> !book.isDeleted()).skip(offset).limit(limit).map(bookMapper::toBookResponse).toList();

    }

    public List<BookResponse> getBookPublishers(String publisherName, int page, int limit){
        if(page<1) return null;
        int offset = (page - 1) * limit;

        var publisher = publisherRepository.findByPublisherName(publisherName).orElseThrow(
                () -> new AppException(ErrorCode.PUBLISHER_NOT_EXISTED)
        );

        var books = publisher.getBooks();

        return books.stream().filter(book-> !book.isDeleted()).skip(offset).limit(limit).map(bookMapper::toBookResponse).toList();
    }
}
