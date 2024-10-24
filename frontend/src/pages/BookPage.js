import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, Button, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { Star, StarBorder, StarHalf } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import booksData from '../data/booksData';

const genres = ['All', 'Fantasy', 'Classics', 'Dystopian', 'Romance'];
const sortingOptions = ['Price: Low to High', 'Price: High to Low', 'Newest', 'Oldest'];

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
  return totalRating / reviews.length;
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} sx={{ color: '#FFD700' }} />);
    } else if (i - rating < 1) {
      stars.push(<StarHalf key={i} sx={{ color: '#FFD700' }} />);
    } else {
      stars.push(<StarBorder key={i} sx={{ color: '#FFD700' }} />);
    }
  }
  return stars;
};

const BookPage = ({ addToCart }) => {
  const [books, setBooks] = useState(Array.isArray(booksData) ? booksData : []);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortOption, setSortOption] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || '';
    filterBooks(selectedGenre, query);
  }, [location.search, selectedGenre]);

  const filterBooks = (genre, query) => {
    let filteredBooks = Array.isArray(booksData) ? booksData : [];

    if (genre !== 'All') {
      filteredBooks = filteredBooks.filter((book) =>
        book.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    if (query) {
      filteredBooks = filteredBooks.filter((book) =>
        book.name.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase())
      );
    }

    setBooks(filteredBooks);
  };

  const sortBooks = (option) => {
    let sortedBooks = [...books];
    if (option === 'Price: Low to High') {
      sortedBooks.sort((a, b) => a.price - b.price);
    } else if (option === 'Price: High to Low') {
      sortedBooks.sort((a, b) => b.price - a.price);
    } else if (option === 'Newest') {
      sortedBooks.sort((a, b) => b.publicationYear - a.publicationYear);
    } else if (option === 'Oldest') {
      sortedBooks.sort((a, b) => a.publicationYear - b.publicationYear);
    }
    setBooks(sortedBooks);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || '';
    filterBooks(genre, query);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    sortBooks(option);
  };

  const handleAddToCart = (book) => {
    if (book.stock > 0) {
      addToCart({ ...book, price: book.price * (1 - book.discount / 100) });
      updateStock(book.id, -1);
    } else if (book.preOrder) {
      alert('Sản phẩm hiện hết hàng nhưng có thể đặt trước.');
      addToCart({ ...book, preOrder: true });
    } else {
      alert('Sản phẩm hiện đã hết hàng.');
    }
  };

  const updateStock = (bookId, change) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, stock: book.stock + change } : book
      )
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh', paddingTop: '80px' }}>
      <Typography 
        variant="h4" 
        sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: '#2e7d32' }}
      >
        Sách - Truyện Tranh
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: '200px' }}>
          <InputLabel>Thể loại</InputLabel>
          <Select value={selectedGenre} onChange={handleGenreChange} label="Thể loại">
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: '200px' }}>
          <InputLabel>Sắp xếp</InputLabel>
          <Select value={sortOption} onChange={handleSortChange} label="Sắp xếp">
            {sortingOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {books.length > 0 ? (
          books.map((book) => {
            const averageRating = calculateAverageRating(book.reviews);
            const discountedPrice = book.discount ? book.price * (1 - book.discount / 100) : book.price;
            return (
              <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 200, objectFit: 'contain', borderBottom: '1px solid #ddd' }}
                    image={book.image}
                    alt={book.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      component={Link}
                      to={`/books/${book.id}`}
                      variant="h6"
                      sx={{ fontWeight: 'bold', textDecoration: 'none', color: '#2e7d32' }}
                    >
                      {book.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Tác giả: {book.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Thể loại: {book.genre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Năm xuất bản: {book.publicationYear}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {renderStars(averageRating)}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {averageRating.toFixed(1)} / 5
                      </Typography>
                    </Box>
                    {book.discount > 0 && (
                      <Chip label={`Giảm ${book.discount}%`} color="error" sx={{ mt: 2 }} />
                    )}
                    <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold', mt: 2 }}>
                      {discountedPrice.toLocaleString()} ₫
                    </Typography>
                    {book.discount > 0 && (
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: '#999', mt: 1 }}
                      >
                        {book.price.toLocaleString()} ₫
                      </Typography>
                    )}
                  </CardContent>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: '0 0 12px 12px',
                      backgroundColor: '#2e7d32',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#1b5e20',
                      },
                    }}
                    onClick={() => handleAddToCart(book)}
                    disabled={book.stock === 0 && !book.preOrder}
                  >
                    {book.stock > 0 ? 'Thêm vào giỏ hàng' : book.preOrder ? 'Đặt trước' : 'Hết hàng'}
                  </Button>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
            Không tìm thấy sách nào.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default BookPage;
