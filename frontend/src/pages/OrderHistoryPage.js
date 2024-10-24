import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const statuses = ['Tất cả', 'Đang xử lý', 'Đã giao', 'Đã hủy'];

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setOrderHistory(savedOrders);
    setFilteredOrders(savedOrders);
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    filterOrders(event.target.value, startDate, endDate);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    filterOrders(selectedStatus, event.target.value, endDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    filterOrders(selectedStatus, startDate, event.target.value);
  };

  const filterOrders = (status, start, end) => {
    let filtered = [...orderHistory];

    if (status !== 'Tất cả') {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (start) {
      const startDate = dayjs(start);
      filtered = filtered.filter((order) => dayjs(order.date).isAfter(startDate.subtract(1, 'day')));
    }

    if (end) {
      const endDate = dayjs(end);
      filtered = filtered.filter((order) => dayjs(order.date).isBefore(endDate.add(1, 'day')));
    }

    setFilteredOrders(filtered);
  };

  return (
    <Box sx={{ mt: 16, maxWidth: '900px', margin: '0 auto', px: 2, paddingTop: '70px' }}>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: '#2e7d32' }}
      >
        Lịch Sử Đơn Hàng
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select value={selectedStatus} onChange={handleStatusChange} label="Trạng thái">
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Từ ngày"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Đến ngày"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {filteredOrders.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>
          Không có đơn hàng nào phù hợp với bộ lọc.
        </Typography>
      ) : (
        filteredOrders.map((order) => (
          <Card
            key={order.id}
            sx={{
              mb: 4,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                Mã đơn hàng: {order.id}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ngày đặt: {order.date}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold', color: '#2e7d32' }}>
                Trạng thái: {order.status}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32', fontWeight: 'bold' }}>
                Tổng tiền: {order.totalAmount.toLocaleString()} ₫
              </Typography>

              {order.shippingInfo && (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                    Thông tin giao hàng:
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      <strong>Tên người nhận:</strong> {order.shippingInfo.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      <strong>Số điện thoại:</strong> {order.shippingInfo.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      <strong>Địa chỉ:</strong> {order.shippingInfo.address}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                </>
              )}

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                Sản phẩm:
              </Typography>
              <ul style={{ paddingLeft: '20px' }}>
                {order.items.map((item, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Số lượng: {item.quantity}
                    </Typography>
                  </li>
                ))}
              </ul>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#2e7d32',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    px: 4,
                    py: 1.5,
                    mt: 3,
                    '&:hover': {
                      backgroundColor: '#1b5e20',
                    },
                  }}
                  component={Link}
                  to="/"
                >
                  Tiếp tục mua hàng
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default OrderHistoryPage;
