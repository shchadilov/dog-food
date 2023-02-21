import React from 'react';
import { Link } from 'react-router-dom';
import { EmojiFrown } from 'react-bootstrap-icons';

import Card from '../components/Card';

export default function Catalog({ data, user }) {
  return (
    <>
      {(data.length > 0) ?
        <>
          <h1>Каталог товаров</h1>
          <div className="cards" >
            {data.map((el, i) =>
              
                <Card key={el._id} id={el._id} text={el.name} img={el.pictures} price={el.price} />
              )}
          </div>
        </> :
        <div className="no-results-block">
          <EmojiFrown />
          <p>{user ? 'Товары не найдены' : 'Требуется авторизация'}</p>
          <Link to="/" className="btn">На главную</Link>
        </div>       
      }
    </>);
}



