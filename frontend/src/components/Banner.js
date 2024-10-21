import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import bannerImage from '../assets/images/banner.jpg'; 
import './styles/style.css';
const Banner = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '250px', md: '400px' }, 
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.8rem', md: '3rem' } }}>
          Explore your next Adventure
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.25rem' } }}>
          Discover the best books across all genres
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#1e88e5',
            padding: '10px 20px',
            borderRadius: '20px',
            '&:hover': {
              bgcolor: '#1565c0',
            },
          }}
        >
          Start Reading
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
