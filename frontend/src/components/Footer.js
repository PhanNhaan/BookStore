import React from 'react';
import { Box, Typography, Container, Grid, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: '#2e7d32',
      color: 'white',
      py: 4,
      mt: 6, 
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            BOOK STORE
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Your favorite place for books and comics. Discover and enjoy the best literature collections.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Liên Kết Hữu Ích
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            <a href="/privacy-policy" style={{ color: 'white', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>
              Chính sách bảo mật
            </a>
            <a href="/terms-of-service" style={{ color: 'white', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>
              Điều khoản dịch vụ
            </a>
            <a href="/contact" style={{ color: 'white', textDecoration: 'none', display: 'block' }}>
              Liên hệ chúng tôi
            </a>
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Theo Dõi Chúng Tôi
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton href="#" sx={{ color: 'white' }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" sx={{ color: 'white' }}>
              <Instagram />
            </IconButton>
            <IconButton href="#" sx={{ color: 'white' }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" sx={{ color: 'white' }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2" sx={{ color: '#d4d4d4' }}>
          © 2024 BOOK STORE. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
