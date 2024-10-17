// Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ backgroundColor: '#2e7d32', color: 'white', textAlign: 'center', py: 2, mt: 'auto' }}>
    <Typography variant="body2">© 2024 BOOK STORE. All Rights Reserved.</Typography>
    <Typography variant="body2">
      <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Chính sách bảo mật</a> | 
      <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Điều khoản dịch vụ</a>
    </Typography>
  </Box>
);

export default Footer;
