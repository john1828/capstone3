import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "../UserContext";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import ProductsCatalog from "./pages/ProductsCatalog";
import Register from "./pages/Register";
import Login from "./pages/Login";


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
      fetch("http://localhost:4000/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
