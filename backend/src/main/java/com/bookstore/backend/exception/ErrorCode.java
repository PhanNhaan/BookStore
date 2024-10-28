package com.bookstore.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least 3 characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1008,"Email is not valid", HttpStatus.BAD_REQUEST),
    PHONE_INVALID(1009, "Invalid phone number", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    EMAIL_EXISTED(1010, "Email existed", HttpStatus.BAD_REQUEST),
    PHONE_EXISTED(1011, "Phone existed", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_EXISTED(1012, "Category not existed", HttpStatus.NOT_FOUND),
    CATEGORY_EXISTED(1013, "Category existed", HttpStatus.BAD_REQUEST),
    BOOK_EXISTED(1014, "Book existed", HttpStatus.BAD_REQUEST),
    BOOK_NOT_EXISTED(1015, "Book not existed", HttpStatus.NOT_FOUND),
    BOOK_DELETED(1016, "Book deleted", HttpStatus.BAD_REQUEST),
    BOOK_NOT_DELETED(1017, "Book not deleted", HttpStatus.NOT_FOUND),
    NOT_HAVE_CATRGORY(1018, "Not have category", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
