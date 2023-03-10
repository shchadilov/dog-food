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
  const { user, logIn, cart } = useContext(Ctx);

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
        {user && <Link to="/cart" className="menu__element profile-icon">
            <CartIcon />
            {cart.length > 0 && <div className="icon-badge">{cart.length}</div>}
            </Link>}
        {!user && <div onClick={logIn} className="menu__element profile-icon" ><ProfileIcon /></div>}
        {user && <Link to="/profile" className="menu__element profile-icon"><ProfileIcon /></Link>}
      </nav>
    </header>
  );
}