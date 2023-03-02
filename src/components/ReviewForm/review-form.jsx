import React, { useState, useContext } from 'react';
import Ctx from '../../Ctx';
import './review-form.css'

export default function ReviewForm({ productId, setProduct }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const { api } = useContext(Ctx);

  const handler = (e) => {
    e.preventDefault();
    let body = {
      rating: rating || 5,
      text: text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };

    api.addReview(productId, body)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setProduct(data);
            resetForm();            
          }
        });
  }

  const resetForm = () => {
    setRating('5');
    setText('');
  };

  return (
    <form className="review-form" onSubmit={handler}>
      <label htmlFor="rating">Выберите оценку:</label>
      <select className="review-form__rating" name="rating" value={rating} onChange={e => setRating(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <label htmlFor="text">Ваш отзыв:</label>
      <textarea className="review-form__text" name="text" value={text} onChange={e => setText(e.target.value)}
          required={true}></textarea>
      <button type="submit" className="btn btn_add-review">Добавить</button>
    </form>
  )
}