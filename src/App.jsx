import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "../UserContext";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import ProductsCatalog from "./pages/ProductsCatalog";
import ProductView from "./pages/ProductView";
import CartView from "./pages/CartView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  function unsetUser() {
    localStorage.clear();
    setUser({
      id: null,
      isAdmin: null,
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        "http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/users/details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data._id) {
            setUser({
              id: data._id,
              isAdmin: data.isAdmin,
            });
          } else {
            setUser({
              id: null,
              isAdmin: null,
            });
          }
        })
        .catch(() => {
          setUser({
            id: null,
            isAdmin: null,
          });
        });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsCatalog />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
