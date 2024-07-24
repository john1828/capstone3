import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function UserView({productData}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log(productData);

        const productArr = productData.map(product => {
            if(product.isActive === true) {
                return (
                    <ProductCard productProp={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })

        setProducts(productArr)

    }, [productData])

    return(
             [products]
        )
}