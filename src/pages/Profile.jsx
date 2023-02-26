import React, { useContext } from 'react';
import Ctx from '../Ctx';

export default function Profile() {
  const { user, logOut } = useContext(Ctx);

  return (
    <div className="profile">
      <h1>Личный кабинет</h1>
      <button className="btn btn_exit-profile" onClick={logOut}>Выход</button>
      <div className="avatar">{user && user.avatar && <img className="avatar__image" src={user.avatar} alt={user.name} />}</div>
      <dl className="user-description">        
        {user && user.name && <><dt>Имя:</dt><dd>{user.name}</dd></>}
        {user && user.email && <><dt>Адрес электронной почты:</dt><dd>{user.email}</dd></>}
        {user && user.about && <><dt>Описание:</dt><dd>{user.about}</dd></>}
      </dl>      
    </div>
  );

}