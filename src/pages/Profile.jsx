import React, { useState, useContext } from 'react';
import Ctx from '../Ctx';
import { PencilSquare, XSquare, CheckSquare } from 'react-bootstrap-icons';

export default function Profile() {
  const { user, setUser, logOut, api } = useContext(Ctx);
  const [nameEditActive, setNameEditActive] = useState(false);
  const [name, setName] = useState(user.name);
  const [aboutEditActive, setAboutEditActive] = useState(false);
  const [about, setAbout] = useState(user.about);
  const [avatarEditActive, setAvatarEditActive] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

  const updateMyInfo = () => {
    api.updateMyInfo({
        name,
        about,
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setNameEditActive(false);
            setAboutEditActive(false);
        });
  }

  const updateMyAvatar = () => {
    api.updateMyAvatar({
        avatar,
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setAvatarEditActive(false);
        });
  }

  return (
    <div className="profile">
      <h1>Личный кабинет</h1>
      <button className="btn btn_exit-profile" onClick={logOut}>Выход</button>
      <div className="avatar">
      {user && user.avatar && <img className="avatar__image" src={user.avatar} alt={user.name} />}
      
      {!avatarEditActive ?
            <div className="user-edit-row">
              <PencilSquare className="avatar__edit-button" onClick={() => setAvatarEditActive(true)}/>
            </div> :
            <div className="user-edit-row">
              <input type="text" value={avatar} required onChange={e => setAvatar(e.target.value)} />
              <CheckSquare onClick={updateMyAvatar} />
              <XSquare onClick={() => {
                  setAvatar(user.avatar);
                  setAvatarEditActive(false);
                  }} />
            </div>}
      </div>
      <dl className="user-description">
        <dt>Имя:</dt>       
        {!nameEditActive ?
            <>
             <dd>{user.name}<PencilSquare onClick={() => setNameEditActive(true)}/></dd>             
            </> :
            <div className="user-edit-row">
              <input type="text" value={name} required onChange={e => setName(e.target.value)} />
              <CheckSquare onClick={updateMyInfo} />
              <XSquare onClick={() => {
                  setName(user.name);
                  setNameEditActive(false);
                  }} />
            </div>}
        {user && user.email && <><dt>Адрес электронной почты:</dt><dd>{user.email}</dd></>}
        <dt>Описание:</dt>
        {!aboutEditActive ?
            <>
             <dd>{user.about}<PencilSquare onClick={() => setAboutEditActive(true)}/></dd>             
            </> :
            <div className="user-edit-row">
              <input type="text" value={about} required onChange={e => setAbout(e.target.value)} />
              <CheckSquare onClick={updateMyInfo} />
              <XSquare onClick={() => {
                  setAbout(user.about);
                  setAboutEditActive(false);
                  }} />
            </div>}
      </dl>      
    </div>
  );
}