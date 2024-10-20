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
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        p: 2,
        zIndex: 10,
        right: 0,
        top: 40,
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color: '#2e7d32' }}>
        Giỏ hàng của bạn
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#555' }}>
          Giỏ hàng trống
        </Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                }
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      Số lượng: {item.quantity} - Giá: {item.price.toLocaleString()} ₫
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="middle" />
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
              bgcolor: '#4caf50', 
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#388e3c', 
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
              bgcolor: '#66bb6a', 
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#43a047', 
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
