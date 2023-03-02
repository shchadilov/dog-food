import React, { useContext, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import Ctx from '../Ctx';

import '../bootstrap-scope.scss';
import Row from '../components/Row/row';

export default function Cart() {
  const [gds, setGds] = useState([]);
  const { cart, goods } = useContext(Ctx);
  useEffect(() => {
      let arr = [];
      if (goods.length) {
          cart.forEach(el => {
              arr.push(goods.filter(g => g._id === el.id)[0])
          })
      }
      setGds(arr);
  }, [cart, goods])

  return (
    <div className="bootstrap-scope">
      <h1 className="cart__header">Корзина</h1>
        {cart.length > 0 && gds.length > 0 && <Table className="cart__table" hover>
            <thead>
                <tr>
                    <th>Изображение</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((el, i) => <Row key={el.id} {...gds[i]} {...el} />)}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} className="text-end fw-bold fs-3 total-title_desktop">ИТОГО:</td>
                    <td colSpan={2} className="text-end fw-bold fs-3 total-title_mobile">ИТОГО:</td>
                    <td className="fw-bold fs-3">
                        {cart.reduce((acc, el, i) => {
                            acc += el.quantity * (gds[i].price / 100 * (100 - gds[i].discount) );
                            return acc;
                        }, 0)}₽
                    </td>
                </tr>
            </tfoot>
        </Table>}
        {cart.length === 0 && <span>Корзина пуста</span>}
    </div>
  );
}