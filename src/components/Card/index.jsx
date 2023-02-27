import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import Ctx from '../../Ctx';

import "./index.css";

export default function Card({ id, text, img, price }) {
  const { setCart } = useContext(Ctx);

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCart(prev => {
      const test = prev.filter(el => el.id === id)
      if (test.length) {
        return prev.map(el => {
            if (el.id === id) {
              el.quantity++;
            }
            return el; 
            });
      } else {
        return [...prev, {id: id, quantity: 1}];
      }      
    });
  }

  return (
    <div className="card">
      <Link to={`/catalog/${id}`}>
        <div className="card__title">{text}</div>
      </Link>
      <Link to={`/catalog/${id}`}>
        <img src={img} alt={text} />
      </Link>
      <Link to={`/catalog/${id}`}>
        <div className="card__price">{price} ₽</div>
      </Link>
      <button className="btn add-to-cart" type="button" onClick={addToCart}>В корзину</button>
    </div>
  )
}