import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import './index.css';
import { products as initialProducts } from './data/products';
import './styles/style.css';

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const savedHistory = localStorage.getItem('orderHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [userProfile, setUserProfile] = useState(() => JSON.parse(localStorage.getItem('userProfile')) || null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [cart, orderHistory]);

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) => item.id === product.id ? { ...productInCart, quantity: productInCart.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const addOrderToHistory = (order) => {
    setOrderHistory([...orderHistory, order]);
  };

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          userProfile={userProfile}
          totalItemsInCart={totalItemsInCart}
          setFilteredProducts={setFilteredProducts}
          products={products}
          cart={cart} 
        />

        <main>
          <Routes>
            <Route path="/" element={<Home products={filteredProducts} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route
              path="/checkout"
              element={
                isAuthenticated ? (
                  <CheckoutPage
                    cart={cart}
                    userProfile={userProfile}
                    setCart={setCart}
                    addOrderToHistory={addOrderToHistory}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/orders" element={<OrderHistoryPage orderHistory={orderHistory} />} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserProfile={setUserProfile} />} />
            <Route path="/profile" element={<ProfilePage userProfile={userProfile} setUserProfile={setUserProfile} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
