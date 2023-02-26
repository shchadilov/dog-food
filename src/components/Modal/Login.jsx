import React, { useState, useContext } from "react";
import { ReactComponent as CrossImg } from './img/xmark-solid.svg';

import Ctx from '../../Ctx';

export default function Login({ change }) {
  const { api, setToken, setModalActive } = useContext(Ctx);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  
  const sendForm = (e) => {
    e.preventDefault();

    const body = {
      email,
      password,       
    }

    api.signIn(body)
        .then(res => res.json())
        .then(data => {
          if (!data.err) {
            localStorage.setItem('user', JSON.stringify(data.data));
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setEmail('');
            setPassword('');
            setModalActive(false);
          } else {
            setErrorText(data.message);
            setPassword('');
          }
        });
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrorText('');
  }

  return (
    <>       
    <div className="modal-close" onClick={() => {setModalActive(false); resetForm()}}><CrossImg /></div>
    <form onSubmit={sendForm}>
      <label htmlFor="email">Электронная почта</label>
      <input 
          id="email"
          type="email"
          value={email} 
          required
          onChange={(e) => {setEmail(e.target.value)}} />
      <label htmlFor="password">Пароль</label>
      <input 
          id="password"
          type="password" 
          value={password} 
          onChange={(e) => {setPassword(e.target.value)}} />
      <div className="error-block">{errorText}</div>   
      <button className="btn" type="submit">
        Войти
      </button>      
      <button className="btn link" type="button" onClick={() => {change(prev => !prev)}}>
        Зарегистрироваться
      </button>
    </form>
    </>
  )
}