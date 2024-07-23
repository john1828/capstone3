import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function UserView({productData}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log(productData);

        const productArr = productData.map(product => {
            //only render the active courses
            if(product.isActive === true) {
                return (
                    <ProductCard productProp={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })

        //set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
        setProducts(productArr)

    }, [productData])

    return(
             [products]
        )
}