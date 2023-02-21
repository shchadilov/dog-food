import React, { useState } from "react";
import { ReactComponent as CrossImg } from './img/xmark-solid.svg';

export default function Signup({ change, api, setModalActive, setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordIsOk, setPasswordIsOk] = useState(false);
  const [errorText, setErrorText] = useState('');

  const checkPassword = (val, type = 'main') => {
    if (typeof val !== 'string') return;

    if (type === 'main') {
      if (val !== '') setPasswordIsOk(val === confirmPassword);
      setPassword(val);
    } else {
      if (val !== '') setPasswordIsOk(val === password);
      setConfirmPassword(val);
    }
  }

  const sendForm = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,       
    }
    api.signUp(body)
        .then(res => res.json())
        .then(data => {
          if (!data.err) {
            api.signIn(body)
              .then(res => res.json())
              .then(data => {
                localStorage.setItem('user', data.data.name);
                localStorage.setItem('token', data.token);
                setToken(data.token);
              });
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setModalActive(false);
          } else {
            setErrorText(data.message);
            setPassword('');
            setConfirmPassword('');
          }
        });    
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
          onChange={(e) => {checkPassword(e.target.value)}} />
      <label htmlFor="confirm-password">Повторите пароль</label>
      <input 
          id="confirm-password"
          type="password" 
          value={confirmPassword} 
          onChange={(e) => {checkPassword(e.target.value, 'secondary')}} />
      <div className="error-block">{errorText}</div> 
      <button className="btn" type="submit" disabled={!passwordIsOk}>
        Зарегистрироваться
      </button>      
      <button className="btn link" type="button" 
          onClick={() => {change(prev => !prev)}}>
        Войти
      </button>
    </form>
    </>
  )
}