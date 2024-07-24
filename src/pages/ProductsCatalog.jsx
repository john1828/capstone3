import { useState, useEffect, useContext } from "react";
import { CardGroup } from "react-bootstrap";
import ProductSearch from "../components/ProductSearch";
import UserView from "../components/UserView";
import UserContext from "../../UserContext";
import AdminView from "../components/AdminView";

export default function ProductsCatalog() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUrl = user.isAdmin
      ? "http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/products/all"
      : "http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/products/active";

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        // Check if data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected array but received:", data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  }, [user]);

  return (
    <>
      <ProductSearch />
      <h2 className="text-center mt-3 my-5">Our Products</h2>
      <CardGroup className="justify-content-center">
        <UserView productData={products} />
      </CardGroup>
    </>
  );
}
