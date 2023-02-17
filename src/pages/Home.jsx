import React from 'react';
import Card from '../components/Card';

export default function Home({ data }) {
  return (
    <>
      <h1>Каталог товаров</h1>
      <div className="cards">
        {data.map((el, i) => <Card key={'card_' + i} text={el.name} img={el.pictures} price={el.price} />)}
      </div>
    </>
  );
}