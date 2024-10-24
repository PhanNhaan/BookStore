import React, { useState } from 'react';
import { Box, TextField, Button, Rating, Typography } from '@mui/material';
import './styles/style.css';

const ReviewForm = ({ onAddReview }) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user && rating && comment) {
      onAddReview({ user, rating, comment, date: new Date().toISOString().split('T')[0] });
      setUser('');
      setRating(0);
      setComment('');
      setErrorMessage(''); 
    } else {
      setErrorMessage('Please fill in all fields.');
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      className="review-form-container"
      sx={{ 
        mt: 5, 
        p: 3, 
        backgroundColor: '#f9f9f9', 
        borderRadius: 2, 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2e7d32' }}>
        Add a Review
      </Typography>
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <TextField
        label="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ mr: 2, color: '#555' }}>Rating:</Typography>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          sx={{ color: '#2e7d32' }}
        />
      </Box>
      <TextField
        label="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#2e7d32',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1b5e20',
          },
          fontWeight: 'bold',
          borderRadius: 2,
          px: 4,
        }}
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
