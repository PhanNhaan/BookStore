import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated, setUserProfile }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();


    const userData = {
      username: username,
      name: 'Tên người dùng',
      address: 'Địa chỉ của bạn',
      phone: 'Số điện thoại của bạn'
    };

    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userProfile', JSON.stringify(userData));

 
    setIsAuthenticated(true);
    setUserProfile(userData);

    navigate('/');
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '400px' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Đăng nhập</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Đăng nhập
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
