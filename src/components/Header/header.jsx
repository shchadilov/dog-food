import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Search from '../Search/search';
import Ctx from '../../Ctx';
import { PlusCircle } from 'react-bootstrap-icons';

import logoImg from './img/logo.svg';
import logoMinImg from './img/logo_min.svg';
import { ReactComponent as ProfileIcon } from './img/ic-profile.svg';
import { ReactComponent as CartIcon } from './img/ic-cart.svg';

export default function Header() {
  const { user, logIn } = useContext(Ctx);

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
        <Search />
      </div>
      <nav className="menu">
        {user && <Link to="/add" className="menu__element add-icon"><PlusCircle /></Link>}
        {user && <CartIcon />}
        {!user && <button onClick={logIn} className="menu__element profile-icon" ><ProfileIcon /></button>}
        {user && <Link to="/profile" className="menu__element profile-icon"><ProfileIcon /></Link>}
      </nav>
    </header>
  );
}