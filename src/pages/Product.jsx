import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Trash3 } from 'react-bootstrap-icons';
import Review from '../components/Review/review';
import Ctx from '../Ctx';
import { ArrowLeft } from 'react-bootstrap-icons';

import ReviewForm from '../components/ReviewForm/review-form.jsx'

export default function Product() {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { token, api, user, setGoods, setCart, calcPrice } = useContext(Ctx);

  useEffect(() => {
    if (token) {
      api.getProduct(id)
          .then(res => res.json())
          .then(data => {
            setProduct(data);
      })
    }
  }, []);

  const remove = () => {
    api.deleteProduct(id)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
            setGoods(prev => prev.filter(g => g._id !== data._id))
            navigate('/catalog');
        }
      });
  }

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
    <>
      <Link to="/catalog">
        <div className="back-link">
          <ArrowLeft /> В КАТАЛОГ
        </div>
      </Link>

      <div className="product-heading">
        <h1>{product.name || 'Страница товара'}</h1>
      </div>
      {product && product.author && product.author._id === user._id && <button
            onClick={remove} 
            className="btn button-trash">
              <Trash3 />
            </button>}

      <div className="product">
        <div className="product-image">
          <img src={product.pictures} alt={product.name} />          
          {product.discount > 0 && <div className="product-image__discount-label">{`-${product.discount}%`}</div>}          
        </div>
        <div className="product-data">
          <div>            
            <span className="product-data__price">
              {product.discount > 0 ?
                  calcPrice(product) :
                  product.price} ₽    
            </span>
            {product.discount > 0 && <span className="product-data__old-price"><s>{product.price} ₽</s></span>}
          </div>
          <button className="btn add-to-cart" type="button" onClick={addToCart}>В корзину</button>
          <div className="product-data__description">{product.description}</div>
        </div>
      </div>
      <div className="reviews">
        <h2>Отзывы</h2>
        <ReviewForm productId={id} setProduct={setProduct} />
        <div className="review-cards">
          {product.reviews && product.reviews.length === 0 && <span>Отзывов пока нет</span>}
          {product.reviews && product.reviews.length > 0 && 
              product.reviews.map((el) => <Review {...el} productId={id} setProduct={setProduct} key={el._id} />)}
        </div>
      </div>
    </>
  )
}