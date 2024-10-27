import React from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';

const PurchaseHistoryPage = ({ orderHistory }) => {
  return (
    <Box sx={{ mt: 5, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#2e7d32' }}>Lịch sử mua hàng</Typography>
      {orderHistory.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>Bạn chưa có đơn hàng nào.</Typography>
      ) : (
        orderHistory.map((order, index) => (
          <Card key={index} sx={{ mb: 3, padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Mã đơn hàng: {order.id}</Typography>
              <Typography variant="subtitle1">Ngày đặt hàng: {order.date}</Typography>
              <Typography variant="subtitle1">Tổng cộng: {order.totalAmount.toLocaleString()} ₫</Typography>
              <Divider sx={{ my: 2 }} />
              {order.items.map((item, i) => (
                <Typography key={i}>
                  {item.name} (x{item.quantity}) - {item.price.toLocaleString()} ₫
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default PurchaseHistoryPage;
