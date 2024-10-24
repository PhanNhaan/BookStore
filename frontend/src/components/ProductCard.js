import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const ProductCard = ({ product, addToCart }) => {
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      originalPrice: product.price,
      discount: product.discount,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <Card
      className="product-card"
      sx={{
        maxWidth: 250,
        margin: '16px auto',
        height: '100%',
        transition: 'transform 0.3s',
        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image || '/path/to/placeholder.jpg'}
        alt={product.name}
        sx={{ borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
      />
      <CardContent sx={{ padding: '16px' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontSize: '16px', fontWeight: 'bold', color: '#2e7d32' }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '14px', marginBottom: '8px', color: '#555' }}
        >
          {product.genre}
        </Typography>
        {product.discount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: '#d32f2f',
              color: '#fff',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            Giảm {product.discount}%
          </Box>
        )}
        <Box sx={{ marginBottom: '12px' }}>
          {product.discount > 0 && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#888', fontSize: '14px' }}>
              {product.price.toLocaleString()} ₫
            </Typography>
          )}
          <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '18px' }}>
            {discountedPrice.toLocaleString()} ₫
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#2e7d32',
            borderRadius: '8px',
            width: '100%',
            fontSize: '14px',
            padding: '8px',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#1b5e20',
            },
          }}
          onClick={handleAddToCart}
        >
          Thêm vào giỏ
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
