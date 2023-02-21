import React from "react";
import { Link } from 'react-router-dom';

import "./index.css";

export default function Card({ id, text, img, price }) {
  return (
    <div className="card">
      <Link to={`/catalog/${id}`}>
        <div className="card__title">{text}</div>
      </Link>
      <Link to={`/catalog/${id}`}>
        <img src={img} alt="Изображение продукта" />
      </Link>
      <Link to={`/catalog/${id}`}>
        <div className="card__price">{price} ₽</div>
      </Link>
      <button className="btn add-to-cart" type="button">В корзину</button>
    </div>
  )
}