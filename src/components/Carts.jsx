import { useState, useEffect } from "react";
import CartTable from "./CartTable";

export default function Carts({ cartData, fetchCart }) {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const cartsArr = cartData.map((cart, index) => (
      <CartTable cartProp={cart} fetchCart={fetchCart} key={cart._Id} />
    ));

    setCarts(cartsArr);
  }, [cartData]);

  return <>{carts}</>;
}
