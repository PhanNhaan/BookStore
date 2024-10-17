import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {}; 

  if (!order) {
    return (
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h5">Không tìm thấy thông tin đơn hàng.</Typography>
      </Box>
    );
  }

  const handleViewOrderHistory = () => {
    navigate('/orders'); 
  };

  return (
    <Box sx={{ mt: 5, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Xác nhận Đơn Hàng
      </Typography>
      <Typography variant="h6">Mã đơn hàng: {order.id}</Typography>
      <Typography>Ngày đặt: {order.date}</Typography>
      <Typography>Tổng tiền: {order.totalAmount.toLocaleString()} ₫</Typography>

      <Typography variant="h6" sx={{ mt: 4 }}>Sản phẩm:</Typography>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} - Số lượng: {item.quantity}
          </li>
        ))}
      </ul>

      <Button 
        variant="contained" 
        sx={{ mt: 4, marginRight: 2 }} 
        href="/" 
      >
        Quay lại trang chủ
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mt: 4 }} 
        onClick={handleViewOrderHistory}
      >
        Xem lịch sử đơn hàng
      </Button>
    </Box>
  );
};

export default OrderConfirmationPage;
