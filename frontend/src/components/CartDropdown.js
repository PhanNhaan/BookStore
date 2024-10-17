import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CartDropdown = ({ cart = [], closeCart }) => {
  return (
    <Box sx={{ position: 'absolute', right: 0, top: 50, width: 300, bgcolor: 'white', boxShadow: 3, padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Giỏ hàng của bạn</Typography>

      {cart.length === 0 ? (
        <Typography>Giỏ hàng của bạn đang trống</Typography>
      ) : (
        <Box>
          {cart.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>{item.name}</Typography>
              <Typography>{item.quantity} x {item.price.toLocaleString()} ₫</Typography>
            </Box>
          ))}

          <Button variant="contained" sx={{ mt: 2, width: '100%' }} onClick={closeCart} component={Link} to="/cart">
            Xem giỏ hàng
          </Button>
          <Button variant="contained" sx={{ mt: 1, width: '100%' }} onClick={closeCart} component={Link} to="/checkout">
            Thanh toán
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartDropdown;
