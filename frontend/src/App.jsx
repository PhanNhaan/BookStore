import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactPage from './pages/ContactPage';
import TermsOfService from './pages/TermsOfService';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import BookPage from './pages/BookPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
// import LoginPage from './pages/LoginPage';
import LoginPage from './components/login/login';
import Register from './components/Register/Register';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OffersPage from './pages/OffersPage'; 
import './index.css';
import RewardPage from './pages/RewardPage';
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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [cart, orderHistory, userProfile]);

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) => item.id === product.id ? { ...productInCart, quantity: productInCart.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const addOrderToHistory = (order) => {
    setOrderHistory([...orderHistory, order]);
  };

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div id="app-root" className={isHomePage ? 'no-padding-top' : ''}>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userProfile={userProfile}
        totalItemsInCart={totalItemsInCart}
        setFilteredProducts={setFilteredProducts}
        products={products}
        cart={cart}
        removeFromCart={removeFromCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home products={filteredProducts} addToCart={addToCart} searchQuery={searchQuery} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} removeFromCart={removeFromCart} />} />
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
          <Route path="/books" element={<BookPage addToCart={addToCart} />} />
          <Route path="/books/:id" element={<BookDetailPage addToCart={addToCart} />} />
          <Route path="/rewards" element={isAuthenticated ? <RewardPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserProfile={setUserProfile} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <UserProfile
                  userProfile={userProfile}
                  setUserProfile={(updatedProfile) => {
                    setUserProfile(updatedProfile);
                    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                  }}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
