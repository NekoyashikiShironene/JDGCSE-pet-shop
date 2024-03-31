import React, {useEffect} from 'react';
import Login from './Login.js';
import Register from './Register.js';
import Welcome from './Welcome.js';
import Products from './ProductsView.js';
import ProductDetail from './ProductDetail.js';
import Cart from './Cart.js';
import Checkout from './Checkout.js';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar.js';
import Orders from './Orders.js';

function App() {

  useEffect(() => {
    console.log('App component rendered');
  });

  return (
      
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />\
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Router>


      </div>
  );
}

export default App;
