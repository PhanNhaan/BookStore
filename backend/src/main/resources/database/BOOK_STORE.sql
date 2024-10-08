-- Tạo bảng Publishers
CREATE TABLE Publishers (
    publisher_id bigint not null auto_increment PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    website VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Categories
CREATE TABLE Categories (
    category_id bigint not null auto_increment PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Authors
CREATE TABLE Authors (
    author_id bigint not null auto_increment PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Books
CREATE TABLE Books (
    book_id bigint not null auto_increment PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    publisher_id bigint,
    publication_year bigint,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity bigint DEFAULT 0,
    description TEXT,
    cover_image VARCHAR(255),
    sale DECIMAL(5, 2) DEFAULT 0, -- % giảm giá
    deleted BIT DEFAULT 0, -- Xóa mềm
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publisher_id) REFERENCES Publishers(publisher_id)
);

-- Tạo bảng Promotions
CREATE TABLE Promotions (
    promotion_id bigint not null auto_increment PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order DECIMAL(10, 2), -- Giá trị tối thiểu của đơn hàng
    max_discount DECIMAL(10, 2), -- Giá trị giảm tối đa nếu là giảm theo %
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng liên kết Book_Authors 
CREATE TABLE Book_Authors (
    book_id bigint,
    author_id bigint,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

-- Tạo bảng liên kết Book_Categories 
CREATE TABLE Book_Categories (
    book_id bigint,
    category_id bigint,
    PRIMARY KEY (book_id, category_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

--  bảng Users
CREATE TABLE Users (
    user_id bigint not null auto_increment PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    phone_number VARCHAR(15),
    address VARCHAR(255),
    dob DATE, -- Ngày sinh
    gender VARCHAR(10), -- Giới tính
    avatar VARCHAR(255), -- Ảnh đại diện (tùy chọn)
    role VARCHAR(20) DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--  bảng Orders
CREATE TABLE Orders (
    order_id bigint not null auto_increment PRIMARY KEY,
    user_id bigint,
    promotion_id bigint,  -- Khóa ngoại cho khuyến mãi
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address VARCHAR(255),
    payment_method VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id)
);

--  bảng Order_Items 
CREATE TABLE Order_Items (
    order_id bigint,
    book_id bigint,
    price DECIMAL(10, 2) NOT NULL, -- Giá sách
    quantity bigint NOT NULL, -- Số lượng sách
    PRIMARY KEY (order_id, book_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- bảng Reviews
CREATE TABLE Reviews (
    review_id bigint not null auto_increment PRIMARY KEY,
    book_id bigint,
    user_id bigint,
    rating bigint CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- bảng Wishlist
CREATE TABLE Wishlist (
    wishlist_id bigint not null auto_increment PRIMARY KEY,
    user_id bigint,
    book_id bigint,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- bảng Token
CREATE TABLE Token (
    token_id bigint not null auto_increment PRIMARY KEY,
    user_id bigint,
    token VARCHAR(255),
    refresh_token VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- bảng Comments
CREATE TABLE Comments (
    comment_id bigint not null auto_increment PRIMARY KEY,
    user_id bigint,
    book_id bigint,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- bảng Cart_Items (dùng khóa kép cart_id và book_id)
CREATE TABLE Cart_Items (
    user_id bigint,
    book_id bigint,
    quantity bigint NOT NULL,
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Quan hệ 1:1 nên dùng user_id thay vì cart_id
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);
