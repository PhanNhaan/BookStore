import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import booksData from '../data/booksData';

const BookDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const book = booksData.find((book) => book.id === parseInt(id));
  const [reviews, setReviews] = useState(book?.reviews || []);
  const [newReview, setNewReview] = useState({
    user: '',
    rating: '',
    comment: '',
  });

  const handleAddReview = () => {
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ user: '', rating: '', comment: '' });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '900px', margin: 'auto', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      {book ? (
        <>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>{book.title}</Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>by {book.author}</Typography>
          <Typography variant="h5" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 2 }}>
            Price: {book.price.toLocaleString()} ₫
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1e88e5', color: '#fff', textTransform: 'none', mb: 4 }}
            onClick={() => addToCart(book)}
          >
            Add to Cart
          </Button>

          <Typography variant="h5" sx={{ mb: 2 }}>Reviews</Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {reviews.map((review, index) => (
              <ListItem key={index} sx={{ mb: 2, backgroundColor: '#f9f9f9', borderRadius: 2, padding: 2, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>{review.user}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {[...Array(Number(review.rating))].map((_, i) => (
                          <StarIcon key={i} sx={{ color: '#ff9800' }} />
                        ))}
                      </Box>
                    </Box>
                  }
                  secondary={review.comment}
                />
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Add a Review</Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                value={newReview.user}
                onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Rating (1-5)"
                fullWidth
                variant="outlined"
                type="number"
                inputProps={{ min: 1, max: 5 }}
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Comment"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleAddReview}
                sx={{ backgroundColor: '#2e7d32', color: '#fff', textTransform: 'none' }}
              >
                Submit Review
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
          Book not found.
        </Typography>
      )}
    </Box>
  );
};

export default BookDetailPage;
