import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import { products as initialProducts } from './data/products';
import { Container } from '@mui/material';
import { Navigate } from 'react-router-dom';
import './index.css';
const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) => (item.id === product.id ? { ...productInCart, quantity: productInCart.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [userProfile, setUserProfile] = useState(() => JSON.parse(localStorage.getItem('userProfile')) || null);

  return (
    <Router>
      <Navbar 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        userProfile={userProfile} 
        totalItemsInCart={totalItemsInCart} 
        setFilteredProducts={setFilteredProducts} 
        products={products} 
      />
      <Container>
        <Routes>
          <Route path="/" element={<Home products={filteredProducts} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={isAuthenticated ? <CheckoutPage cart={cart} userProfile={userProfile} setCart={setCart} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserProfile={setUserProfile} />} />
          <Route path="/profile" element={<ProfilePage userProfile={userProfile} setUserProfile={setUserProfile} />} />

        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
