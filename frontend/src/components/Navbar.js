import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, Menu, MenuItem, InputBase } from '@mui/material';
import { AccountCircle, ShoppingCart, Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated, userProfile, totalItemsInCart, setFilteredProducts, products }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    navigate('/login');
    handleMenuClose();
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) => product.name.toLowerCase().includes(query));
    setFilteredProducts(filtered);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
      <Toolbar>
 
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          BOOK STORE
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '4px', padding: '2px 8px', marginRight: '16px' }}>
          <Search />
          <InputBase
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ marginLeft: '8px', flex: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button sx={{ color: '#fff' }} component={Link} to="/">
            TRANG CHỦ
          </Button>

          <Button sx={{ color: '#fff' }} component={Link} to="/books">
            SÁCH - TRUYỆN TRANH
          </Button>


          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={totalItemsInCart} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isAuthenticated && (
            <Button sx={{ color: '#fff' }} component={Link} to="/checkout" style={{ marginLeft: '10px' }}>
              THANH TOÁN
            </Button>
          )}
          {isAuthenticated ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem component={Link} to="/profile">Hồ sơ của tôi</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>
          ) : (
            <Button sx={{ color: '#fff' }} component={Link} to="/login">
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
