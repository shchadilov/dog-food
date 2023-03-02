import React, { useContext } from 'react';
import { Star, StarFill, Trash3 } from 'react-bootstrap-icons';
import './review.css';

import Ctx from '../../Ctx';

export default function Review({ productId, _id, rating, created_at, text, author, setProduct }) {
  const { user, api } = useContext(Ctx);

  const setRating = (n) => {
    let stars = [];
    for (let i = 0; i < n; i++) {
      stars.push(<StarFill key={i} />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} />);
    }
    return stars;
  }

  const remove = () => {
    api.deleteReview(productId, _id)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProduct(data);
        }
      });
  }

  return (
    <div className="review-card">      
      <div className="review-card__rating">{setRating(rating)}</div>
      <div>{author === user._id && <button onClick={remove} className="btn button-trash review-card__delete"><Trash3 /></button>}</div>
      <div>{new Date(created_at).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      <p className="review-card__text">{text}</p>      
    </div>
  )
}