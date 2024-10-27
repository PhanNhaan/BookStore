import React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const ContactPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 5 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: '16px' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: '#2e7d32' }}>
          Liên Hệ Chúng Tôi
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 2 }}>
              Thông tin liên hệ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ color: '#2e7d32', mr: 1 }} />
              <Typography variant="body1">(+84) 123 456 789</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ color: '#2e7d32', mr: 1 }} />
              <Typography variant="body1">support@bookstore.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ color: '#2e7d32', mr: 1 }} />
              <Typography variant="body1">123 Ngũ Hành Sơn, Đà Nẵng</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 2 }}>
              Gửi tin nhắn cho chúng tôi
            </Typography>
            <form>
              <TextField
                label="Họ và Tên"
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2, borderRadius: '8px' }}
              />
              <TextField
                label="Email"
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2, borderRadius: '8px' }}
              />
              <TextField
                label="Số điện thoại"
                fullWidth
                variant="outlined"
                sx={{ mb: 2, borderRadius: '8px' }}
              />
              <TextField
                label="Nội dung tin nhắn"
                fullWidth
                required
                multiline
                rows={4}
                variant="outlined"
                sx={{ mb: 2, borderRadius: '8px' }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#2e7d32',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#1b5e20',
                  },
                }}
              >
                Gửi Tin Nhắn
              </Button>
            </form>
          </Grid>
        </Grid>

        
      </Paper>
    </Container>
  );
};

export default ContactPage;
