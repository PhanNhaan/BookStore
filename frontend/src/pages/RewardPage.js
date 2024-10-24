import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import { getRewardPoints, redeemRewardPoints, getDiscountCode } from '../services/rewardService';

const RewardPage = () => {
  const [rewardPoints, setRewardPoints] = useState(0);
  const [pointsToRedeem, setPointsToRedeem] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [redeemMessage, setRedeemMessage] = useState('');

  useEffect(() => {
    const points = getRewardPoints();
    setRewardPoints(points);

    const existingDiscountCode = getDiscountCode();
    if (existingDiscountCode) {
      setDiscountCode(existingDiscountCode);
    }
  }, []);

  const handleRedeemPoints = () => {
    const points = parseInt(pointsToRedeem, 10);
    if (isNaN(points) || points <= 0) {
      setRedeemMessage('Số điểm nhập không hợp lệ.');
      return;
    }

    const result = redeemRewardPoints(points);
    if (result.success) {
      setRewardPoints(result.newPoints);
      setDiscountCode(result.discountCode);
      setRedeemMessage(`Đổi điểm thành công! Bạn còn ${result.newPoints} điểm.`);
    } else {
      setRedeemMessage(result.message);
    }

    setPointsToRedeem('');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3, backgroundColor: '#f4f6f8' }}>
      <Card sx={{ width: '100%', maxWidth: 600, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', borderRadius: 3, overflow: 'hidden' }}>
        <CardContent sx={{ backgroundColor: '#2e7d32', color: '#fff', p: 3 }}>
          <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Quản Lý Điểm Thưởng
          </Typography>
        </CardContent>

        <CardContent sx={{ p: 4 }}>
          {redeemMessage && (
            <Alert severity={redeemMessage.includes('thành công') ? 'success' : 'error'} sx={{ mb: 2 }}>
              {redeemMessage}
            </Alert>
          )}

          {discountCode && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Mã giảm giá của bạn: <strong>{discountCode}</strong>
            </Alert>
          )}

          <Typography variant="h6" sx={{ textAlign: 'center', mb: 3, color: '#2e7d32', fontWeight: 'bold' }}>
            Điểm thưởng của bạn: {rewardPoints} điểm
          </Typography>

          <TextField
            fullWidth
            label="Nhập số điểm muốn đổi"
            value={pointsToRedeem}
            onChange={(e) => setPointsToRedeem(e.target.value)}
            variant="outlined"
            placeholder="Nhập số điểm"
            sx={{ backgroundColor: '#fff', borderRadius: 2, mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleRedeemPoints}
            sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
          >
            Đổi điểm
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RewardPage;
