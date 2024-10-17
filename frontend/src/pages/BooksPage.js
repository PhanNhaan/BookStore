import React from 'react';
import BookCategoryMenu from '../components/BookCategoryMenu';
import { Box, Typography } from '@mui/material';

const BooksPage = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <BookCategoryMenu />
    </Box>
  );
};

export default BooksPage;
