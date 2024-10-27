import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    alert('Đăng ký thành công!');
    navigate('/login');
  };

  return (
    <Box sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4">Đăng ký</Typography>
      <TextField
        label="Tên đăng nhập"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Mật khẩu"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleRegister}>
        Đăng ký
      </Button>
    </Box>
  );
};

export default RegisterPage;
