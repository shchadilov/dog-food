import React, { useState } from 'react';
import './style.css';

import Signup from './Signup';
import Login from './Login';

export default function Modal({ modalActive, setModalActive }) {
  const [formIsLogin, setFormIsLogin] = useState(true);

  let style = {
    display: modalActive && 'flex',
  }

  return (
    <div className="modal-container" style={style}>
      <div className="modal">
        <h2>{formIsLogin ? 'Войти' : 'Зарегистрироваться'}</h2>
        {formIsLogin ? 
              <Login change={setFormIsLogin} setModalActive={setModalActive} /> : 
              <Signup change={setFormIsLogin} setModalActive={setModalActive} />}
      </div>
    </div>
  )
}