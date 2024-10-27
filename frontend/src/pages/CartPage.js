import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../styles/transition.css';


const CartPage = ({ cart, setCart, removeFromCart }) => {
  const navigate = useNavigate();
  const [inTransition, setInTransition] = useState(false); 
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleIncrease = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCheckout = () => {
    setInTransition(true); 
  };

  const onTransitionEnd = () => {
    navigate('/checkout'); 
  };

  return (
    <CSSTransition
      in={!inTransition}
      timeout={300}
      classNames="fade"
      unmountOnExit
      onExited={onTransitionEnd}
    >
      <Box sx={{ mt: 5, mx: 'auto', maxWidth: '1200px', padding: '20px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', color: '#2e7d32' }}>
          Giỏ hàng của bạn
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#555' }}>
            Giỏ hàng của bạn đang trống.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {cart.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginRight: '20px',
                      }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{item.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#555' }}>Thể loại: {item.category}</Typography>
                      <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold', color: '#2e7d32' }}>
                        {item.price.toLocaleString()} ₫
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>Số lượng: {item.quantity}</Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleDecrease(item.id)} sx={{ color: '#2e7d32' }}>
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => handleIncrease(item.id)} sx={{ color: '#2e7d32' }}>
                        <Add />
                      </IconButton>
                      <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: 'red' }}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 5, textAlign: 'right' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Tổng cộng: {totalAmount.toLocaleString()} ₫
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  px: 5,
                  py: 2,
                  fontWeight: 'bold',
                  bgcolor: '#2e7d32',
                  '&:hover': {
                    bgcolor: '#1b5e20',
                  },
                }}
                onClick={handleCheckout} 
              >
                Thanh toán
              </Button>
            </Box>
          </>
        )}
      </Box>
    </CSSTransition>
  );
};

export default CartPage;
