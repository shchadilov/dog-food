import React from "react";
import './nav-mobile.css';

import profileIcon from './img/ic-profile.svg';

export default function NavMobile({ user, setUser, setModalActive }) {
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
    <nav className="nav-mobile">
      {!user && 
            <div className="nav-mobile__icon" onClick={logIn}>
              <img className="icon__image" src={profileIcon} alt="Профиль" />
              <div className="icon__title">Вход</div>
            </div>}
      {user && 
            <div className="nav-mobile__icon" onClick={logOut}>
              <img className="icon__image" src={profileIcon} alt="Профиль" />
              <div className="icon__title">Выйти</div>
            </div>}    
    </nav>
  );
}