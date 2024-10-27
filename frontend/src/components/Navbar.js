import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, InputBase } from '@mui/material';
import { ShoppingCart, Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import CartDropdown from './CartDropdown';
import UserMenu from './UserMenu';

const Navbar = ({ isAuthenticated, setIsAuthenticated, userProfile, totalItemsInCart, cart, removeFromCart }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    navigate('/login');
    handleMenuClose();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    navigate(`/books?search=${query}`);
  };

  const viewCart = () => {
    navigate('/cart');
    setIsCartOpen(false);
  };

  const checkout = () => {
    navigate('/checkout');
    setIsCartOpen(false);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2e7d32', padding: '0 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}
        >
          BOOK STORE
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f3f4',
            borderRadius: '50px',
            padding: '5px 20px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            marginRight: '20px',
          }}
        >
          <SearchIcon sx={{ color: '#555' }} />
          <InputBase
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginLeft: '10px', flex: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button sx={{ color: '#fff' }} component={Link} to="/">
            Trang chủ
          </Button>
          <Button sx={{ color: '#fff' }} component={Link} to="/books">
            Sách - Truyện tranh
          </Button>
          <Box sx={{ position: 'relative' }}>
            <IconButton color="inherit" onClick={() => setIsCartOpen(!isCartOpen)}>
              <Badge badgeContent={totalItemsInCart} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {isCartOpen && (
              <CartDropdown
                cart={cart}
                removeFromCart={removeFromCart}
                viewCart={viewCart}
                checkout={checkout}
              />
            )}
          </Box>
          <Button sx={{ color: '#fff' }} component={Link} to="/checkout">
            Thanh toán
          </Button>

         

          {isAuthenticated ? (
            <UserMenu
              anchorEl={anchorEl}
              handleMenuOpen={handleMenuOpen}
              handleMenuClose={handleMenuClose}
              handleLogout={handleLogout}
              userProfile={userProfile}
            />
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
