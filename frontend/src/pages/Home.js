import React from 'react';
import { Box, Grid, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import bannerImage from '../assets/images/banner.jpg';
import { useState, useEffect } from "react";

const Home = ({ products, addToCart }) => {
  useEffect(() => {
    if (document.referrer !== window.location.href) {
      window.location.reload();
    }
  }, [])

  return (
    <Box sx={{ mt: 5 }}>
      <Box
        sx={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          mb: 4,
          p: { xs: 3, sm: 5, md: 7 },
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
            Welcome to Our Book Store!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
            Discover the best books across all genres
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#2e7d32',
              color: 'white',
              borderRadius: '20px',
              px: 5,
              py: 2,
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
            }}
          >
            Explore Now
          </Button>
        </Box>
      </Box>


      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#2e7d32' }}>Featured Products</Typography>

      {products.length > 0 ? (
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ px: { xs: 3, sm: 5, md: 8, lg: 10 } }}
        >
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} sx={{ maxWidth: '250px' }}>
              <Card
                className="card"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {product.price.toLocaleString()} ₫
                  </Typography>
                </CardContent>
                <Box sx={{ textAlign: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product)}
                    sx={{ borderRadius: '20px' }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 5, color: '#555' }}>
          No products available.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
