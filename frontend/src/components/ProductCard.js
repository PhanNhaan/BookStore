import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card className="product-card" sx={{ maxWidth: 220, margin: 'auto', height: '100%', transition: '0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || '/path/to/placeholder.jpg'}
        alt={product.name}
      />
      <CardContent sx={{ padding: '10px' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '16px' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '8px' }}>
          {product.category}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '14px', marginBottom: '12px' }}>
          {product.price.toLocaleString()} ₫
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: '#2e7d32', borderRadius: '20px', width: '100%', fontSize: '12px', padding: '6px' }}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
