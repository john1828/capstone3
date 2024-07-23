import { useState, useEffect, useContext } from 'react';
import { CardGroup } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import ProductSearch from '../components/ProductSearch';
import UserView from '../components/UserView';
import UserContext from "../../UserContext";

export default function ProductsCatalog() {

    const {user} = useContext(UserContext);


    const [products, setProducts] = useState([]);


    const fetchData = () => {

        let fetchUrl = user.isAdmin === true ? "http://localhost:4000/courses/all" : "http://localhost:4000/courses/"

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data.message === "No courses found"){
                setProducts([])
            } else {
                setProducts(data);
            }
        })

    }

    useEffect(() => {

        fetchData();

    }, [user]);

    return(
        <>
            <ProductSearch />
            <h2 className='text-center mt-3 my-5'>Our Products</h2>
            <CardGroup className="justify-content-center">
                <UserView productData={products} />
            </CardGroup>
        </>
    )
}
