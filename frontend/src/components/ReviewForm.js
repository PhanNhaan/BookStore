import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Rating } from '@mui/material';

const ReviewForm = ({ onAddReview }) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user && rating && comment) {
      onAddReview({ user, rating, comment, date: new Date().toISOString().split('T')[0] });
      setUser('');
      setRating(0);
      setComment('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Rating
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
