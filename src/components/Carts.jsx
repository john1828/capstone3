import { useState, useEffect } from 'react';
import CartTable from './CartTable';

export default function Carts({cartData, fetchCart}) {

    const [carts, setCarts] = useState([])

    useEffect(() => {
        console.log(cartData);

        const cartsArr = cartData.map(cart => {
            return (
                <CartTable cartProp={cart} fetchCart={fetchCart} key={cart._id}/>
            )
        })

        setCarts(cartsArr)

    }, [cartData])

    return(
            [ carts ]
        )
}