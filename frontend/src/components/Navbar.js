import React, { useState, useCallback, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, Menu, MenuItem, InputBase } from '@mui/material';
import { AccountCircle, ShoppingCart, Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce'; 
import CartDropdown from './CartDropdown'; 

const Navbar = ({
  isAuthenticated, setIsAuthenticated, userProfile, totalItemsInCart, cart, setFilteredProducts, products,
}) => {
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

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300),
    [products, setFilteredProducts]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

 
  useEffect(() => {
    if (cart.length > 0) {
      setIsCartOpen(true); 
    }
  }, [cart]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e7d32', padding: '0 20px' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          BOOK STORE
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2px 8px',
            marginRight: '16px',
            width: '300px',
          }}
        >
          <Search />
          <InputBase
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginLeft: '8px', flex: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button sx={{ color: '#fff' }} component={Link} to="/">
            TRANG CHỦ
          </Button>
          <Button sx={{ color: '#fff' }} component={Link} to="/books">
            SÁCH - TRUYỆN TRANH
          </Button>

          <Box>
            <IconButton color="inherit" onClick={() => setIsCartOpen(!isCartOpen)}>
              <Badge badgeContent={totalItemsInCart} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {isCartOpen && <CartDropdown cart={cart} closeCart={() => setIsCartOpen(false)} />} {/* Render Cart Dropdown */}
          </Box>

          {isAuthenticated && (
            <>
              <Button sx={{ color: '#fff' }} component={Link} to="/checkout">
                THANH TOÁN
              </Button>
              <Button sx={{ color: '#fff' }} component={Link} to="/orders">
                LỊCH SỬ ĐƠN HÀNG
              </Button>
            </>
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
