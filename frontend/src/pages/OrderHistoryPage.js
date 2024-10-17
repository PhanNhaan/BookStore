import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    console.log('Dữ liệu lịch sử đơn hàng:', savedOrders);
    setOrderHistory(savedOrders);
  }, []);

  return (
    <Box sx={{ mt: 5, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Lịch Sử Đơn Hàng
      </Typography>
      {orderHistory.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>
          Bạn chưa có đơn hàng nào.
        </Typography>
      ) : (
        orderHistory.map((order) => (
          <Card key={order.id} sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6">Mã đơn hàng: {order.id}</Typography>
              <Typography>Ngày đặt: {order.date}</Typography>
              <Typography>Tổng tiền: {order.totalAmount.toLocaleString()} ₫</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Sản phẩm:</Typography>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - Số lượng: {item.quantity}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))
      )}
      <Button variant="contained" color="primary" component={Link} to="/">
        Tiếp tục mua hàng
      </Button>
    </Box>
  );
};

export default OrderHistoryPage;
