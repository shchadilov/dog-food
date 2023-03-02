import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './style.css';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Modal from './components/Modal';
import NavMobile from './components/NavMobile/nav-mobile'

import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Profile from './pages/Profile.jsx';
import Product from './pages/Product.jsx';
import AddForm from './pages/AddForm.jsx';
import Cart from './pages/Cart.jsx';

import Api from './Api';
import Ctx from './Ctx';

const App = () => {
  let userLocalData = localStorage.getItem('user');
  if (userLocalData) {
    userLocalData = JSON.parse(userLocalData);
  }

  const [user, setUser] = useState(userLocalData);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [modalActive, setModalActive] = useState(false);
  const [api, setApi] = useState(new Api(token));
  const [goods, setGoods] = useState([]);
  const [visibleGoods, setVisibleGoods] = useState(goods);
  const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);

  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    setModalActive(prev => !prev);
  }

  const logOut = (e) => {  
    e.preventDefault();
    localStorage.removeItem('user');
    setUser('');
    setGoods('');   
    navigate('/'); 
  }

  useEffect(() => {
    if (token) { 
      api.getProducts()
          .then(res => res.json())
          .then(data => {
            setGoods(data.products);
          });
    }

  }, []);

  useEffect(() => {
    setApi(new Api(token));
    let userLocalData = localStorage.getItem('user');
    if (userLocalData) {
      userLocalData = JSON.parse(userLocalData);
    }
    setUser(userLocalData);
  }, [token]);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('token');
      setToken(null);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      api.getProducts()
          .then(res => res.json())
          .then(data => {
            setGoods(data.products);
          });      
    }
  }, [api]);

  useEffect(() => {
    setVisibleGoods(goods);
  }, [goods]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Ctx.Provider value={{
      user,
      token,
      api,
      modalActive,
      goods,
      visibleGoods,
      cart,
      setUser,
      setToken,
      setApi,
      setModalActive,
      setGoods,
      setVisibleGoods,
      setCart,
      logIn,
      logOut,      
    }}>
      <div className="wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catalog/:id" element={<Product />} />
            <Route path="/add" element={<AddForm />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Modal />
      <NavMobile />
    </Ctx.Provider>
  )
};

export default App;