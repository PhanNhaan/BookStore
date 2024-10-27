import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Alert } from '@mui/material';
import { redeemRewardPoints } from '../services/rewardService';

const offers = [
  { id: 1, name: 'Giảm giá 5% cho đơn hàng tiếp theo', pointsRequired: 50 },
  { id: 2, name: 'Miễn phí vận chuyển', pointsRequired: 30 },
  { id: 3, name: 'Giảm giá 10% cho đơn hàng từ 500,000₫', pointsRequired: 100 },
];

const OffersPage = () => {
  const [rewardPoints, setRewardPoints] = useState(() => parseInt(localStorage.getItem('rewardPoints'), 10) || 0);
  const [message, setMessage] = useState('');

  const handleRedeem = (offer) => {
    const result = redeemRewardPoints(offer.pointsRequired);
    if (result.success) {
      setRewardPoints(result.newPoints);
      setMessage(`Bạn đã đổi thành công ưu đãi: ${offer.name}`);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <Box sx={{ mt: 5, mx: 'auto', maxWidth: '600px', padding: '20px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Ưu đãi của bạn
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: '#2e7d32' }}>
        Điểm thưởng hiện tại: {rewardPoints} điểm
      </Typography>

      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {offers.map((offer) => (
        <Card key={offer.id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">{offer.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Yêu cầu: {offer.pointsRequired} điểm
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => handleRedeem(offer)}
              disabled={rewardPoints < offer.pointsRequired}
            >
              Đổi ưu đãi
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default OffersPage;
