// Комментарий для преподавателя: в файлах JSX я стараюсь следовать Google JavaScript Style Guide,
// увеличив длину строки с 80 до 120. Гайдлайн предписывает выделять перенос длинных строк с помощью
// двойного блочного отступа (4 пробелами), решил на всякий случай указать это в комментарии.

import React, { useState, useEffect } from 'react';
import './style.css';
import products from './assets/data.json';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Modal from './components/Header/Modal';
import Banner from "./components/Banner/banner";
import NavMobile from './components/NavMobile/nav-mobile'

import Greeting from "./components/Greeting/greeting";
import Home from './pages/Home.jsx';
import HomeRestricted from './pages/HomeRestricted.jsx';

import Api from "./Api";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [modalActive, setModalActive] = useState(false);
  const [api, setApi] = useState(new Api(token));
  const [goods, setGoods] = useState([]);

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

  return (
    <>
      <div className="container">
        <Header 
            user={user} 
            setUser={setUser} 
            products={products} 
            setModalActive={setModalActive} />
        <main>
          <Greeting />
          <section className="banners">
            <Banner
                image={'https://i.imgur.com/EYs95hi.png'}
                alt={'Торты для собак'}
                size={'big'} />
            <Banner
                image={'https://i.imgur.com/cL1GxdP.png'}
                alt={'Новинки'}
                size={'small'} />
            <Banner
                image={'https://i.imgur.com/G2trEk2.png'}
                alt={'Миски'}
                size={'small'} />
          </section>
          {user ? <Home data={goods} /> : <HomeRestricted />}
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
          setUser={setUser} 
          setModalActive={setModalActive} />
    </>
  )
};

export default App;