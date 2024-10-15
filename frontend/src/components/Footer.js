import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#2e7d32', color: '#fff', textAlign: 'center', py: 2, mt: 'auto' }}>
      <Typography variant="body2">© 2024 BOOK STORE. All Rights Reserved.</Typography>
      <Typography variant="body2">
        Chính sách bảo mật | Điều khoản dịch vụ
      </Typography>
    </Box>
  );
};

export default Footer;