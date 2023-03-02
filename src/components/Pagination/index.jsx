import React from "react";
import { CaretRightFill, CaretLeftFill } from "react-bootstrap-icons";
import './style.css';

export default function Pagination({ hook }) {
  const max = hook.maxPage;
  const current = hook.currentPage;
  const pages = [];

  for (let i = 0; i < max; i++) {
    pages.push(i + 1);
  }

  return (
    <div className="page-container">
      <button className="btn page" onClick={hook.previous} disabled={current === 1}><CaretLeftFill /></button>
      {pages.map(p => <button 
          key={p}
          className={p === current ? 'btn page page_current' : 'btn page page_available'}
          onClick={e => {hook.step(p)}}
          style={{ backgroundColor: p === current && '#222', color: p === current && 'yellow'}}>
          {p}
          </button>)}

      <button className="btn page" onClick={hook.next} disabled={current === max}><CaretRightFill /></button>
    </div>
  );
}