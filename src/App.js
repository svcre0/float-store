import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Notfound from './component/Notfound';
import Header from './component/Layouts/Header';
import Footer from './component/Footer';
import { auth } from './firebase';
import ShoppingContext from './Context/shopping/shoppingContext';
import { useContext, useEffect } from 'react';
import ProductDetails from './component/ProductDetails';
import SearchResults from './component/SearchResults';

import Products from './component/Products';
import Login from './component/Login';

import CheckoutProduct from './component/CheckoutProduct';
import Checkout from './component/Checkout';
import Payment from './component/Payment';
import Orders from './component/Orders';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Q0F5l03osImxnaMrbCgfWYpv9FCv6leUwpsCzEttBSpP1J0iCRnAn6c3m7sEJBwi4Xmi6bE3SKDijCwYW83BoPP00QcDV76tk');

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

const App = () => {
  const { setUser } = useContext(ShoppingContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User is -> ", authUser);
      setUser(authUser || null);
    });
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header />
       
       

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/checkout-product" element={<CheckoutProduct />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<PaymentWrapper />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
