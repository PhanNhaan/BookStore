import React from 'react';
import { Box, Typography, Button, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartDropdown = ({ cart, removeFromCart, viewCart, checkout }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '350px',
        backgroundColor: '#fff',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        borderRadius: '16px',
        p: 3,
        zIndex: 10,
        right: 0,
        top: 50,
        maxHeight: '450px',
        overflowY: 'auto',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#2e7d32',
        }}
      >
        Giỏ hàng của bạn
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#888', mt: 2 }}>
          Giỏ hàng trống
        </Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  padding: '10px 0',
                  ':hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: '#333', fontSize: '1rem', mb: 0.5 }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Số lượng: {item.quantity} x {item.price.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777', mt: 0.5 }}>
                    Tổng: {(item.price * item.quantity).toLocaleString()} ₫
                  </Typography>
                </Box>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    color: '#d32f2f',
                    ':hover': {
                      backgroundColor: '#ffebee',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}

      {cart.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              backgroundColor: '#4caf50',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '20px',
              padding: '10px',
              ':hover': {
                backgroundColor: '#388e3c',
              },
            }}
            onClick={viewCart}
          >
            Xem giỏ hàng
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              backgroundColor: '#66bb6a',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '20px',
              padding: '10px',
              ':hover': {
                backgroundColor: '#43a047',
              },
            }}
            onClick={checkout}
          >
            Thanh toán
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartDropdown;
