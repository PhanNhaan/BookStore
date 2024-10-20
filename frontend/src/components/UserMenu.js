import React from 'react';
import { IconButton, Menu, MenuItem, Avatar, Typography, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserMenu = ({ anchorEl, handleMenuOpen, handleMenuClose, handleLogout, userProfile }) => {
  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Avatar sx={{ bgcolor: '#fff', color: '#2e7d32' }}>
          {userProfile?.name ? userProfile.name[0].toUpperCase() : <AccountCircle />}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ mt: '5px' }} 
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
            Hồ sơ của tôi
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
            Đăng xuất
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
