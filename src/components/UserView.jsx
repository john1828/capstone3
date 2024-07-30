import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../index.css";

export default function UserView({ productData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productArr = productData.map((product) => {
      if (product.isActive === true) {
        return <ProductCard productProp={product} key={product._id} />;
      } else {
        return null;
      }
    });

    setProducts(productArr);
  }, [productData]);

  return [products];
}
