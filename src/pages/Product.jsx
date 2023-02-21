import React from 'react';
import {useParams, Link} from 'react-router-dom';

export default function Product() {
  const {id} = useParams();

  return (
    <>
    <h1>Страница товара</h1>
    <p>{id}</p>

    </>
  )
}