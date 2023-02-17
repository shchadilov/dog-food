import React from "react";
import "./index.css";

export default function Card({ text, img, price }) {
  return (
    <div className="card">
      <div className="card__title">{text}</div>
      <img src={img} alt="Изображение продукта" />
      <div className="card__price">{price} ₽</div>
      <button className="btn add-to-cart" type="button">В корзину</button>
    </div>
  )
}