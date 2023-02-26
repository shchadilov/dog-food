import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav-mobile.css';
import profileIcon from './img/ic-profile.svg';
import { ReactComponent as HomeIcon } from './img/house-solid.svg';
import { ReactComponent as CartIcon } from './img/ic-cart.svg';
import { BookHalf } from 'react-bootstrap-icons';
import { PlusCircle } from 'react-bootstrap-icons';
import Ctx from '../../Ctx';

export default function NavMobile() {
  const { user, logIn } = useContext(Ctx);
  const navigate = useNavigate();

  return (
    <nav className="nav-mobile">
      <div className="nav-mobile__icon">
       <Link to="/catalog"><HomeIcon /></Link>
        <div className="icon__title">Главная</div>
      </div>

      <div className="nav-mobile__icon">
        <Link to="/catalog"><BookHalf /></Link>
        <div className="icon__title">Каталог</div>
      </div>

      {user && 
          <div className="nav-mobile__icon">
            <Link to="/"><CartIcon /></Link>    
            <div className="icon__title">Корзина</div>
          </div>}
      
      {user && 
          <div className="nav-mobile__icon">
            <Link to="/add"><PlusCircle /></Link>            
            <div className="icon__title">Добавить</div>
          </div>}

      {!user && 
          <div className="nav-mobile__icon" onClick={logIn}>
            <img className="icon__image" src={profileIcon} alt="Профиль" />
            <div className="icon__title">Войти</div>
          </div>}
      {user && 
          <div className="nav-mobile__icon" onClick={() => navigate('/profile')}>
            <img className="icon__image" src={profileIcon} alt="Профиль" />
            <div className="icon__title">Профиль</div>
          </div>}    
    </nav>
  );
}