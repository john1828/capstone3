import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext";

export default function AppNavbar() {
  const { user, unsetUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    unsetUser();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>ShopEase</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" className="px-2 px-lg-3">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/deals" className="px-2 px-lg-3">
              Deals
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" className="px-2 px-lg-3">
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            {user.id !== null && user.id !== undefined ? (
              user.isAdmin ? (
                <>
                  <Nav.Link as={NavLink} to="/profile" className="px-2 px-lg-3">
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    onClick={handleLogout}
                    className="px-2 px-lg-3">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/profile" className="px-2 px-lg-3">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cart" className="px-2 px-lg-3">
                    Shopping Cart
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    onClick={handleLogout}
                    className="px-2 px-lg-3">
                    Logout
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="px-2 px-lg-3">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="px-2 px-lg-3">
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

