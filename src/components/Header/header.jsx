import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Search from '../Search/search';

import logoImg from './img/logo.svg';
import logoMinImg from './img/logo_min.svg';

export default function Header({ user, logIn, logOut, goods, searchGoods }) {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <picture>
            <source media="(max-width: 720px)" srcSet={logoMinImg} />
            <img src={logoImg} alt="Логотип DogFood" />
          </picture>
        </Link>
      </div>
      <div className="search">
        <Search data={goods} searchGoods={searchGoods} />
      </div>
      <nav className="menu">
        {user && <Link to="/profile" className="user">{user}</Link>}
        {!user && <a href="" onClick={logIn}>Войти</a>}
        {user && <a href="" onClick={logOut}>Выйти</a>}
      </nav>
    </header>
  );
}