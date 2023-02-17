import React from 'react';
import './header.css';
import Search from '../Search/search';

import logoImg from './img/logo.svg';
import logoMinImg from './img/logo_min.svg';

export default function Header({ user, setUser, products, setModalActive }) {
  const logIn = (e) => {
    e.preventDefault();
    setModalActive(prev => !prev);
  }

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    setUser('');
  }

  return (
    <header>
      <div className="logo">
        <picture>
          <source media="(max-width: 720px)" srcSet={logoMinImg} />
          <img src={logoImg} alt="Логотип DogFood" />
        </picture>
      </div>
      <div className="search">
        <Search data={products} />
      </div>
      <nav className="menu">
        {user && <span className="user">{user}</span>}
        {!user && <a href="" onClick={logIn}>Войти</a>}
        {user && <a href="" onClick={logOut}>Выйти</a>}
      </nav>
    </header>
  );
}