import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ProductCard from './ProductCard'; 

const ProductGrid = ({ products, addToCart }) => {
  return (
    <Box sx={{ mt: 3, padding: '0 20px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, color: '#2e7d32', fontSize: '24px' }}>
        Sản phẩm nổi bật
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
