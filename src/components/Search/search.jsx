import React, { useState, useContext } from 'react';
import './search.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchImg } from './img/magnifying-glass-solid.svg';
import { ReactComponent as CloseImg } from './img/circle-xmark-regular.svg';
import Ctx from '../../Ctx';

export default function Search() {
  const {goods, setVisibleGoods} = useContext(Ctx);
  const navigate = useNavigate();
  const [text, updateText] = useState('');
  const [searchData, setSearchData] = useState(goods);

  const clearSearch = () => {
    updateText('');
    setSearchData(goods);
    setVisibleGoods(goods);
  }

  const search = (e) => {
    navigate('/catalog');
    updateText(e.target.value);
    let arr = goods.filter(el => {
      return el.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchData(arr);
    setVisibleGoods(arr);
  }

  return (
    <div className="search-block">
      <input placeholder="Поиск..." value={text} onChange={search} maxLength="27" />
      <button>
        {text ? <CloseImg onClick={clearSearch} /> : <SearchImg />}
      </button>
      {text && <div className="search-result">
        По запросу <b>{text}</b>&nbsp;
        {searchData.length > 0 ?
        `товаров найдено: ${searchData.length}` : 'товары не найдены'}
      </div>}
    </div>
  );
}