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

import Api from './Api';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [modalActive, setModalActive] = useState(false);
  const [api, setApi] = useState(new Api(token));
  const [goods, setGoods] = useState([]);
  const [visibleGoods, setVisibleGoods] = useState(goods);

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
            console.log(data);
            setGoods(data.products);
          });
    }

  }, []);

  useEffect(() => {
    setApi(new Api(token));
    setUser(localStorage.getItem('user'));
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

  return (
    <>
      <div className="container">
        <Header 
            user={user}
            logIn={logIn} 
            logOut={logOut}
            goods={goods} 
            searchGoods={setVisibleGoods} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog data={visibleGoods} user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/catalog/:id" element={<Product />} />
          </Routes>
          {/* {user ? <Home data={goods} /> : <HomeRestricted />} */}
        </main>
        <Footer />
      </div>
      <Modal 
          modalActive={modalActive} 
          setModalActive={setModalActive} 
          api={api} 
          setToken={setToken} />
      <NavMobile 
          user={user}
          logIn={logIn} 
          logOut={logOut} />
    </>
  )
};

export default App;