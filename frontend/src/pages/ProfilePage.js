import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';
const ProfilePage = ({ userProfile, setUserProfile }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        address: userProfile.address || ''
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,11}$/;

    if (!profileData.name) {
      newErrors.name = "Tên không được để trống.";
    }
    if (!emailRegex.test(profileData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!phoneRegex.test(profileData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ. Vui lòng nhập từ 9 đến 11 chữ số.";
    }
    if (!profileData.address) {
      newErrors.address = "Địa chỉ không được để trống.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = () => {
    if (validateForm()) {
      const updatedProfile = { ...userProfile, ...profileData };
      setUserProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      alert("Cập nhật thông tin thành công!");
    }
  };

  return (
    <Box sx={{ mt: 5, maxWidth: '800px', margin: '0 auto' }}>
      <Card sx={{ padding: 3, borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
          Hồ sơ của tôi
        </Typography>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                variant="outlined"
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={profileData.email}
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
                label="Số điện thoại"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                variant="outlined"
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                variant="outlined"
                required
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ bgcolor: '#2e7d32' }}>
              Cập nhật hồ sơ
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
