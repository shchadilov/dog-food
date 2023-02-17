import React, { useState } from 'react';
import './search.css';
import { ReactComponent as SearchImg } from './img/magnifying-glass-solid.svg';
import { ReactComponent as CloseImg } from './img/circle-xmark-regular.svg';

export default function Search({ data }) {
  const [text, updateText] = useState('');
  const [searchData, setSearchData] = useState(data);

  const clearSearch = () => {
    updateText('');
    setSearchData(data);
  }

  const search = (e) => {
    updateText(e.target.value);
    let arr = data.filter(el => {
      return el.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchData(arr);
  }

  return (
    <div className="search-block">
      <input placeholder="Поиск..." value={text} onChange={search} />
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