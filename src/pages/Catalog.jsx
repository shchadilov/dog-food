import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmojiFrown, SortNumericDown, SortNumericUp } from 'react-bootstrap-icons';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import Ctx from '../Ctx';

import Card from '../components/Card';

export default function Catalog() {
  const { visibleGoods, user } = useContext(Ctx);
  const [sortGoods, setSortGoods] = useState(visibleGoods);
  const paginate = usePagination(sortGoods, 12);
  const [btnType, setBtnType] = useState('');

  const updSort = (e) => {
    let el = e.currentTarget;
    let flag = false;
    if (el.classList.contains('sort')) {
      el.classList.remove('sort');
      setBtnType('');
      flag = true;
    } else {
      el.classList.add('sort');
      setBtnType(el.title);
    }
    if (flag) {
      setSortGoods(visibleGoods);
    } else {
      let data = [...visibleGoods];
      switch (el.title) {
        case 'down': 
          data.sort((a,b) => a.price - b.price);
          break;
        case 'up': 
          data.sort((a,b) => b.price - a.price);
          break;
        case 'sale': 
          data = data.filter(d => d.discount > 0);
          break;
      }
      setSortGoods(data);
    }
  }

  useEffect(() => {
    if (sortGoods.length === 0) {
      setSortGoods(visibleGoods);
    }
  }, [visibleGoods]);

  return (
    <>
      {(visibleGoods.length > 0) ?
        <>
          <h1 className="catalog-header">Каталог товаров</h1>
          <div className="catalog-toggles">
          <button className={`btn ${btnType === "down" ? "sort" : ""}`} title="down" onClick={updSort}><SortNumericDown/> По возрастанию цены</button>
            <button className={`btn ${btnType === "up" ? "sort" : ""}`} title="up" onClick={updSort}><SortNumericUp/> По убыванию цены</button>            
            <button className={`btn ${btnType === "sale" ? "sort" : ""}`} title="sale" onClick={updSort}>Скидки</button>
          </div>
          <Pagination hook={ paginate } />
          <div className="cards" >
            {paginate.setPageData().map((el, i) =>              
                <Card 
                    key={el._id} 
                    id={el._id} 
                    text={el.name} 
                    img={el.pictures} 
                    price={el.price / 100 * (100 - el.discount)} 
                        />)}
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




