import React, { useContext, useState, useEffect } from 'react';
import { Image, Button, ButtonGroup } from 'react-bootstrap';

import Ctx from '../../Ctx';

export default function Row({name, pictures, quantity, price, discount, id}) {
    const {setCart} = useContext(Ctx);
    const [n, setN] = useState(quantity);
    const [flag, setFlag] = useState(false);
    const increment = () => {
        setFlag(true);
        setN(n + 1);
    }
    const decrement = () => {
        setFlag(true);
        setN(n - 1);
    }
    useEffect(() => {
        if (flag) {
            setCart(prev => {
                if (n) {
                    return prev.map(el => {
                        if (el.id === id) {
                            el.quantity = n;
                        }
                        return el;
                    })
                } else {
                    return prev.filter(el => el.id !== id);
                }
            })
        }
    }, [n]);
    return <tr className="align-middle">
        <td><Image src={pictures} alt={name} height="100"/></td>
        <td>{name}</td>
        <td>
            <ButtonGroup>
                <Button variant="warning" onClick={decrement}>-</Button>
                <Button variant="light" disabled>{n}</Button>
                <Button variant="warning" onClick={increment}>+</Button>
            </ButtonGroup>
        </td>
        <td>{price / 100 * (100 - discount)}₽</td>
    </tr>
}