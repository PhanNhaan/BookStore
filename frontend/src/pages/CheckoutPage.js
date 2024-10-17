import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart, userProfile, setCart, addOrderToHistory }) => {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      setShippingInfo({
        name: userProfile.name || '',
        phone: userProfile.phone || '',
        address: userProfile.address || '',
        email: userProfile.email || '',
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!shippingInfo.name || shippingInfo.name.length < 2) {
      newErrors.name = "Tên không hợp lệ. Tên phải có ít nhất 2 ký tự.";
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(shippingInfo.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ. Vui lòng nhập từ 9 đến 11 chữ số.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      newErrors.email = "Email không hợp lệ. Vui lòng nhập đúng định dạng.";
    }

    if (!shippingInfo.address) {
      newErrors.address = "Địa chỉ không được để trống.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
      return;
    }

    if (validateForm()) {
      const order = {
        id: new Date().getTime(),
        date: new Date().toLocaleDateString(),
        totalAmount: totalAmount,
        items: [...cart],
      };

      const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));

      addOrderToHistory(order);


      setCart([]);

      navigate('/order-confirmation', { state: { order } });
    } else {
      alert('Vui lòng kiểm tra lại thông tin nhập vào.');
    }
  };

  return (
    <Box sx={{ mt: 5, maxWidth: '1200px', margin: '0 auto' }}>
      <Card sx={{ padding: 3, borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
          Sản phẩm trong giỏ hàng
        </Typography>
        <CardContent>
          {cart.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>
              Giỏ hàng của bạn đang trống.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {cart.map((item, index) => (
                <Grid item xs={12} key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{item.name} (x{item.quantity})</Typography>
                  <Typography>{(item.price * item.quantity).toLocaleString()} ₫</Typography>
                </Grid>
              ))}
            </Grid>
          )}
          <Typography variant="h6" sx={{ textAlign: 'right', mt: 2, color: '#2e7d32' }}>
            Tổng cộng: {totalAmount.toLocaleString()} ₫
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mt: 5, padding: 3, borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
          Thông tin giao hàng
        </Typography>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                variant="outlined"
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                variant="outlined"
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                variant="outlined"
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ giao hàng"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                variant="outlined"
                required
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{ bgcolor: '#2e7d32' }}
              disabled={cart.length === 0}
            >
              Xác nhận đơn hàng
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CheckoutPage;
