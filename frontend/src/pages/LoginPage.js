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
      phone: 'Số điện thoại của bạn',
    };

    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userProfile', JSON.stringify(userData));

    setIsAuthenticated(true);
    setUserProfile(userData);

    navigate('/');
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={6} sx={{ p: 4, width: { xs: '90%', sm: '400px' }, borderRadius: '16px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: '#2e7d32' }}>
          Đăng nhập
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            required
            sx={{ mb: 2, borderRadius: '12px' }}
            InputProps={{
              sx: {
                borderRadius: '12px',
                padding: '12px',
                fontSize: '16px',
              },
            }}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            required
            sx={{ mb: 3 }}
            InputProps={{
              sx: {
                borderRadius: '12px',
                padding: '12px',
                fontSize: '16px',
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#2e7d32',
              color: 'white',
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
            }}
          >
            Đăng nhập
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
