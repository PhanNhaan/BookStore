import React from 'react';
import { Box, Typography, Button, Divider, Card, CardContent, CardMedia } from '@mui/material';

const CartPage = ({ cart, setCart }) => {
  const handleRemove = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleQuantityChange = (productId, amount) => {
    setCart(cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity + amount } : item));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#2e7d32' }}>Giỏ hàng của bạn</Typography>
      <Divider sx={{ mb: 3 }} />
      {cart.map((item) => (
        <Card sx={{ display: 'flex', mb: 2 }} key={item.id}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={item.image}
            alt={item.name}
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">{item.name}</Typography>
            <Typography variant="body1" color="text.secondary">Thể loại: {item.category}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{item.price.toLocaleString()} ₫</Typography>
            <Typography variant="subtitle2" color="text.secondary">Số lượng: {item.quantity}</Typography>
            <Button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity === 1}>-</Button>
            <Button onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
            <Button color="error" onClick={() => handleRemove(item.id)}>Xóa</Button>
          </CardContent>
        </Card>
      ))}
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h5" sx={{ textAlign: 'right', mb: 2 }}>Tổng cộng: {totalPrice.toLocaleString()} ₫</Typography>
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} href="/checkout">
        Thanh toán
      </Button>
    </Box>
  );
};

export default CartPage;
