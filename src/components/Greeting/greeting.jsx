import React from 'react';
import './greeting.css';
import { Link } from 'react-router-dom';

export default function Greeting() {
  return (
    <div className="greeting">
      <div className="greeting__title">
        Крафтовые <br />
        лакомства для <br />
        собак
      </div>
      <div className="greeting__subtitle">
        Всегда свежие лакомства ручной <br />
        работы с доставкой по России и Миру <Link to="/catalog">Ссылка</Link>
      </div>
    </div>
  );
}
