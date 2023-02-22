import React, { useContext } from 'react';
import Ctx from '../Ctx';

export default function Profile() {
  const { user } = useContext(Ctx);

  return (
    <>
      <h1>Личный кабинет</h1>
      <p>Привет, {user}</p>
    </>
  );

}