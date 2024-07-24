import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function UserView({ productData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(productData)) {
      const productArr = productData.map((product) => (
        <ProductCard productProp={product} key={product._id} />
      ));
      setProducts(productArr);
    } else {
      setProducts([]);
    }
  }, [productData]);

  return <>{products}</>;
}
