import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext";
import "../index.css";

export default function AppNavbar() {
  const { user, unsetUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    unsetUser();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navBar">
      <Container>
        <Navbar.Brand className="navBrand text-warning">ShopEase</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" className="navLink px-2 px-lg-3">
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/products"
              className="navLink px-2 px-lg-3">
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            {user.id !== null && user.id !== undefined ? (
              user.isAdmin ? (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/profile"
                    className="navLink px-2 px-lg-3">
                    Hi {user.firstName}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    onClick={handleLogout}
                    className="navLink ps-2 ps-lg-3">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/profile"
                    className="navLink px-2 px-lg-3">
                    Hi {user.firstName}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/cart"
                    className="navLink px-2 px-lg-3">
                    Shopping Cart
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    onClick={handleLogout}
                    className="navLink ps-2 ps-lg-3">
                    Logout
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="navLink px-2 px-lg-3">
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="navLink ps-2 ps-lg-3">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
