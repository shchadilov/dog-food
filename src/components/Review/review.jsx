import React from 'react';
import { Star, StarFill } from 'react-bootstrap-icons';
import './review.css';

export default function Review({ rating, created_at, text }) {
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
  return (
    <div className="review-card">      
      <div className="review-card__rating">{setRating(rating)}</div>
      <div>{new Date(created_at).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      <p className="review-card__text">{text}</p>
    </div>
  )
}