package backend.bookstore.services;

import backend.bookstore.dto.request.BookCreateRequest;
import backend.bookstore.dto.request.BookUpdateRequest;
import backend.bookstore.dto.response.BookResponse;
import backend.bookstore.exception.AppException;
import backend.bookstore.exception.ErrorCode;
import backend.bookstore.mapper.BookMapper;
import backend.bookstore.model.Book;
import backend.bookstore.model.Category;
import backend.bookstore.repository.BookRepository;
import backend.bookstore.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.plaf.PanelUI;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private CategoryRepository categoryRepository;

    public BookResponse createBook(BookCreateRequest request){
        if (bookRepository.existsByTitle(request.getTitle())){
            throw new AppException(ErrorCode.BOOK_EXISTED);
        }
        Book book = bookMapper.toBook(request);

        var categories = categoryRepository.findAllById(request.getCategories());

        if (categories.isEmpty()) throw new AppException(ErrorCode.NOT_HAVE_CATRGORY);

        book.setCategories(new HashSet<>(categories));

        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    public BookResponse getBookById(Long id){
        var book = bookRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.BOOK_NOT_EXISTED));

        return bookMapper.toBookResponse(book);
    }

    public List<BookResponse> getAllBooks(){
        var books = bookRepository.findAll();
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


        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    public List<BookResponse> getBookCategories(String categorieName){
//        HashSet<Book> books = new HashSet<>();
        var category = categoryRepository.findByCategoryName(categorieName).orElseThrow(
                () -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        var books = category.getBooks();

        return books.stream().map(bookMapper::toBookResponse).toList();

    }
}
