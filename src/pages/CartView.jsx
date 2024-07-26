import { useState, useEffect, useContext } from "react";
import Carts from "../components/Carts";
import UserContext from "../../UserContext";

export default function CartView() {
  const { user } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState([]);

  const fetchCart = () => {
    fetch(
      "http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/carts/get-cart",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Cart not Found") {
          setCartProducts([]);
        } else {
          setCartProducts(data);
        }
      });
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return <Carts cartData={cartProducts} fetchCart={fetchCart} />;
}
