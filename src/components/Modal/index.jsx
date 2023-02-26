import React, { useState, useContext } from 'react';
import './style.css';

import Ctx from '../../Ctx';

import Signup from './Signup';
import Login from './Login';

export default function Modal() {
  const { modalActive } = useContext(Ctx);
  const [formIsLogin, setFormIsLogin] = useState(true);

  let style = {
    display: modalActive && 'flex',
  }

  return (
    <div className="modal-container" style={style}>
      <div className="modal">
        <h2>{formIsLogin ? 'Войти' : 'Зарегистрироваться'}</h2>
        {formIsLogin ? 
              <Login change={setFormIsLogin} /> : 
              <Signup change={setFormIsLogin} />}
      </div>
    </div>
  )
}