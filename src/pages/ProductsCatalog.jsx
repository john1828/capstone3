import { useState, useEffect, useContext } from "react";
import { CardGroup } from "react-bootstrap";
import ProductSearch from "../components/ProductSearch";
import UserView from "../components/UserView";
import UserContext from "../../UserContext";
import AdminView from "../components/AdminView";

export default function ProductsCatalog() {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);

  const fetchData = () => {
    let fetchUrl =
      user.isAdmin === true
        ? "http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/products/all"
        : "http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/products/active";

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No products found") {
          setProducts([]);
        } else {
          setProducts(data);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      {user.isAdmin ? (
        <AdminView productData={products} fetchData={fetchData} />
      ) : (
        <>
          <ProductSearch />
          <h2 className="text-center mt-3 my-5">Our Products</h2>
          <CardGroup className="justify-content-center">
            <UserView productData={products} />
          </CardGroup>
        </>
      )}
    </>
  );
}
