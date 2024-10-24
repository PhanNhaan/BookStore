import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Grid, Alert, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addRewardPoints, applyDiscount, getDiscountCode, updateStockAfterOrder } from '../services/rewardService';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from '../components/StripeCheckoutForm';

const stripePromise = loadStripe('your_stripe_publishable_key'); // Replace with your Stripe publishable key

const CheckoutPage = ({ cart, setCart, addOrderToHistory }) => {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default payment method is Cash on Delivery (COD)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setShippingInfo(JSON.parse(savedProfile));
    }
    setFinalAmount(totalAmount);
  }, [totalAmount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscountCode = () => {
    const storedDiscountCode = getDiscountCode();
    if (storedDiscountCode && discountCode === storedDiscountCode) {
      const discountedAmount = applyDiscount(totalAmount, discountCode);
      setFinalAmount(discountedAmount);
      setDiscountApplied(true);
      setSuccessMessage('Mã giảm giá hợp lệ! Bạn được giảm giá 10%.');
    } else {
      setSuccessMessage('Mã giảm giá không hợp lệ.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!shippingInfo.name || shippingInfo.name.length < 2) {
      newErrors.name = 'Tên không hợp lệ. Tên phải có ít nhất 2 ký tự.';
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(shippingInfo.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ. Vui lòng nhập từ 9 đến 11 chữ số.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      newErrors.email = 'Email không hợp lệ. Vui lòng nhập đúng định dạng.';
    }

    if (!shippingInfo.address) {
      newErrors.address = 'Địa chỉ không được để trống.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
      return;
    }

    if (validateForm()) {
      // Process payment based on the selected method
      if (paymentMethod === 'cod') {
        handleOrderConfirmation();
      } else if (paymentMethod === 'paypal' || paymentMethod === 'stripe') {
        setIsProcessingPayment(true); // Show loading or processing state during payment
      }
    } else {
      alert('Vui lòng kiểm tra lại thông tin nhập vào.');
    }
  };

  const handleOrderConfirmation = () => {
    const order = {
      id: new Date().getTime(),
      date: new Date().toLocaleDateString(),
      totalAmount: finalAmount,
      items: [...cart],
      shippingInfo: { ...shippingInfo },
      status: 'Đang xử lý',
    };

    const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));

    const pointsEarned = Math.floor(totalAmount / 10000);
    addRewardPoints(pointsEarned);

    updateStockAfterOrder(cart);

    addOrderToHistory(order);
    setCart([]);

    setSuccessMessage('Đơn hàng đã được xác nhận!');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/orders');
    }, 2000);
  };

  return (
    <Box sx={{ mt: 5, mx: 'auto', maxWidth: '1000px', padding: '20px' }}>
      {successMessage && (
        <Alert severity={successMessage.includes('không hợp lệ') ? 'error' : 'success'} sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Card sx={{ padding: 3, borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
          Sản phẩm trong giỏ hàng
        </Typography>
        <CardContent>
          <Grid container spacing={3}>
            {cart.map((item, index) => (
              <Grid item xs={12} key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{item.name} (x{item.quantity})</Typography>
                <Typography>{(item.price * item.quantity).toLocaleString()} ₫</Typography>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ textAlign: 'right', mt: 2, color: '#2e7d32' }}>
            Tổng cộng: {totalAmount.toLocaleString()} ₫
          </Typography>
          {discountApplied && (
            <Typography variant="h6" sx={{ textAlign: 'right', mt: 2, color: '#d32f2f' }}>
              Giá sau giảm: {finalAmount.toLocaleString()} ₫
            </Typography>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mt: 5, padding: 3, borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
          Mã giảm giá
        </Typography>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Nhập mã giảm giá"
            value={discountCode}
            onChange={handleDiscountCodeChange}
            variant="outlined"
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
            onClick={applyDiscountCode}
          >
            Áp dụng mã giảm giá
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mt: 5, padding: 3, borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
          Phương thức thanh toán
        </Typography>
        <CardContent>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="cod" control={<Radio />} label="Thanh toán khi nhận hàng (COD)" />
            <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
            <FormControlLabel value="stripe" control={<Radio />} label="Thẻ tín dụng / Thẻ ghi nợ (Stripe)" />
          </RadioGroup>
        </CardContent>
      </Card>

      {paymentMethod === 'paypal' && (
        <PayPalScriptProvider options={{ "client-id": "your_paypal_client_id" }}>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: (finalAmount / 23000).toFixed(2) // Example conversion rate from VND to USD
                  }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(() => {
                handleOrderConfirmation();
              });
            }}
          />
        </PayPalScriptProvider>
      )}

      {paymentMethod === 'stripe' && (
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm amount={finalAmount} onSuccess={handleOrderConfirmation} />
        </Elements>
      )}

      <Card sx={{ mt: 5, padding: 3, borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
          Thông tin giao hàng
        </Typography>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                variant="outlined"
                required
                placeholder="Tên người dùng"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                variant="outlined"
                required
                placeholder="Số điện thoại của bạn"
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                variant="outlined"
                required
                placeholder="Email của bạn"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                variant="outlined"
                required
                placeholder="Địa chỉ của bạn"
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{ bgcolor: '#2e7d32', borderRadius: '20px', padding: '10px 20px', fontWeight: 'bold' }}
              disabled={isProcessingPayment}
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
