import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Alert, Tabs, Tab } from '@mui/material';
import { getRewardPoints, redeemRewardPoints, getDiscountCode, getTotalRewardPoints, getMembershipTier } from '../services/rewardService';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [rewardPoints, setRewardPoints] = useState(0);
  const [totalRewardPoints, setTotalRewardPoints] = useState(0);
  const [membershipTier, setMembershipTier] = useState('');
  const [pointsToRedeem, setPointsToRedeem] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [redeemMessage, setRedeemMessage] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    const points = getRewardPoints();
    setRewardPoints(points);

    const totalPoints = getTotalRewardPoints();
    setTotalRewardPoints(totalPoints);

    const tier = getMembershipTier(totalPoints);
    setMembershipTier(tier);

    const existingDiscountCode = getDiscountCode();
    setDiscountCode(existingDiscountCode);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!profile.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(profile.phone)) {
      newErrors.phone = 'Số điện thoại phải là 10-11 chữ số';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!profile.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống';
    }

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setSuccessMessage('Thông tin đã được cập nhật thành công');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleRedeemPoints = () => {
    const points = parseInt(pointsToRedeem, 10);
    if (isNaN(points) || points <= 0) {
      setRedeemMessage('Số điểm nhập không hợp lệ.');
      return;
    }

    const result = redeemRewardPoints(points);
    if (result.success) {
      setRewardPoints(result.newPoints);
      const newTotalPoints = getTotalRewardPoints(); 
      setTotalRewardPoints(newTotalPoints);
      const updatedTier = getMembershipTier(newTotalPoints);
      setMembershipTier(updatedTier);
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
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Hồ Sơ Của Tôi" />
          <Tab label="Điểm Thưởng" />
        </Tabs>

        <CardContent sx={{ paddingTop: 4 }}>
          {activeTab === 0 && (
            <>
              {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {successMessage}
                </Alert>
              )}
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2e7d32' }}>
                Thông tin cá nhân
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Hạng thành viên: <strong>{membershipTier}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Tổng điểm tích lũy: <strong>{totalRewardPoints} điểm</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    error={!!errors.address}
                    helperText={errors.address}
                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSave}
                sx={{
                  mt: 4,
                  backgroundColor: '#2e7d32',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#1b5e20' },
                  fontWeight: 'bold',
                  borderRadius: 3,
                  p: 1.5,
                }}
              >
                Lưu Thông Tin
              </Button>
            </>
          )}

          {activeTab === 1 && (
            <>
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
                sx={{ backgroundColor: '#fff', borderRadius: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleRedeemPoints}
                sx={{ mt: 2, backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
              >
                Đổi điểm
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
