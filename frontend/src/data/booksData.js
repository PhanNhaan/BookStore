const booksData = [
  {
    id: 100,
    name: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    price: 120000,
    discount: 10, // Giảm giá 10%
    publicationYear: 1937,
    image: 'https://via.placeholder.com/150',
    stock: 0, // Hết hàng
    preOrder: true, // Có thể đặt trước
    reviews: [
      {
        user: 'John Doe',
        rating: 5,
        comment: 'Great book for all ages!',
      },
      {
        user: 'Jane Smith',
        rating: 4,
        comment: 'Interesting adventure, but a bit slow in the middle.',
      },
    ],
  },
  {
    id: 101,
    name: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classics',
    price: 150000,
    discount: 0, // Không giảm giá
    publicationYear: 1960,
    image: 'https://via.placeholder.com/150',
    stock: 5, // Còn hàng
    preOrder: false, // Không cần đặt trước
    reviews: [
      {
        user: 'Alice Brown',
        rating: 5,
        comment: 'A classic that everyone should read.',
      },
      {
        user: 'Mark Turner',
        rating: 4,
        comment: 'Powerful story with deep meaning.',
      },
    ],
  },
  {
    id: 102,
    name: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    price: 130000,
    discount: 5, // Giảm giá 5%
    publicationYear: 1949,
    image: 'https://via.placeholder.com/150',
    stock: 0, // Hết hàng
    preOrder: true, // Có thể đặt trước
    reviews: [
      {
        user: 'Sam Wilson',
        rating: 5,
        comment: 'A chilling view of the future.',
      },
      {
        user: 'Emma Watson',
        rating: 4,
        comment: 'Thought-provoking and intense.',
      },
    ],
  },
  {
    id: 103,
    name: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    price: 200000,
    discount: 15, // Giảm giá 15%
    publicationYear: 1997,
    image: 'https://via.placeholder.com/150',
    stock: 10, // Còn hàng
    preOrder: false, // Không cần đặt trước
    reviews: [
      {
        user: 'Lily Evans',
        rating: 5,
        comment: 'A magical journey from start to finish!',
      },
      {
        user: 'James Potter',
        rating: 5,
        comment: 'Loved every moment of it!',
      },
    ],
  },
  {
    id: 104,
    name: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    price: 100000,
    discount: 0, // Không giảm giá
    publicationYear: 1813,
    image: 'https://via.placeholder.com/150',
    stock: 0, // Hết hàng
    preOrder: false, // Không thể đặt trước
    reviews: [
      {
        user: 'Elizabeth Bennet',
        rating: 5,
        comment: 'A timeless romance and social commentary.',
      },
      {
        user: 'Fitzwilliam Darcy',
        rating: 4,
        comment: 'A bit slow but truly captivating.',
      },
    ],
  },
  {
    id: 105,
    name: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classics',
    price: 140000,
    discount: 10, // Giảm giá 10%
    publicationYear: 1925,
    image: 'https://via.placeholder.com/150',
    stock: 3, // Còn hàng
    preOrder: false, // Không cần đặt trước
    reviews: [
      {
        user: 'Nick Carraway',
        rating: 5,
        comment: 'A deep dive into the American dream.',
      },
      {
        user: 'Daisy Buchanan',
        rating: 3,
        comment: 'Beautiful prose but tragic story.',
      },
    ],
  },
  {
    id: 106,
    name: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Classics',
    price: 110000,
    discount: 5, // Giảm giá 5%
    publicationYear: 1951,
    image: 'https://via.placeholder.com/150',
    stock: 0, // Hết hàng
    preOrder: false, // Không thể đặt trước
    reviews: [
      {
        user: 'Holden Caulfield',
        rating: 4,
        comment: 'A story that speaks to the misfits.',
      },
      {
        user: 'Phoebe Caulfield',
        rating: 5,
        comment: 'Loved it. An emotional read.',
      },
    ],
  },
  {
    id: 107,
    name: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    price: 250000,
    discount: 20, // Giảm giá 20%
    publicationYear: 1954,
    image: 'https://via.placeholder.com/150',
    stock: 2, // Còn hàng
    preOrder: false, // Không cần đặt trước
    reviews: [
      {
        user: 'Samwise Gamgee',
        rating: 5,
        comment: 'An epic adventure that will never be forgotten.',
      },
      {
        user: 'Frodo Baggins',
        rating: 5,
        comment: 'The journey is worth every page.',
      },
    ],
  },
  {
    id: 108,
    name: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    genre: 'Fantasy',
    price: 180000,
    discount: 0, // Không giảm giá
    publicationYear: 1950,
    image: 'https://via.placeholder.com/150',
    stock: 5, // Còn hàng
    preOrder: false, // Không cần đặt trước
    reviews: [
      {
        user: 'Lucy Pevensie',
        rating: 5,
        comment: 'Magical and heartwarming!',
      },
      {
        user: 'Edmund Pevensie',
        rating: 4,
        comment: 'A delightful story with deep themes.',
      },
    ],
  },
  {
    id: 109,
    name: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    price: 135000,
    discount: 8, // Giảm giá 8%
    publicationYear: 1932,
    image: 'https://via.placeholder.com/150',
    stock: 0, // Hết hàng
    preOrder: true, // Có thể đặt trước
    reviews: [
      {
        user: 'Mustapha Mond',
        rating: 4,
        comment: 'A visionary and unsettling tale.',
      },
      {
        user: 'John the Savage',
        rating: 3,
        comment: 'Fascinating but heavy in ideas.',
      },
    ],
  },
];

export default booksData;
