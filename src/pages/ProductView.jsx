import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../../UserContext";

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isClickable, setIsClickable] = useState(false);

  const increment = () => {
    if (quantity < 10) {
      setQuantity((prevValue) => prevValue + 1);
    } else {
      Swal.fire({
        title: "Oops!",
        icon: "warning",
        text: "Alert: Maximum of 10pcs per product only.",
      });
    }
  };

  const decrement = () => {
    setQuantity((prevValue) => Math.max(prevValue - 1, 0)); // Prevent negative values
  };

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  };

  function addCart(productId) {
    fetch("https://capstone2-dn1l.onrender.com/b4/carts/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);

        if (data.message === "Action Forbidden") {
          Swal.fire({
            title: "Admin Forbidden",
            icon: "error",
            text: "You are an Administrator you may not add a cart.",
          });
        } else if (
          data.message === "Items added to cart successfully" ||
          "Cart updated successfully"
        ) {
          Swal.fire({
            title: "Item added to cart successfully!",
            icon: "success",
            text: `Total items in cart: ${quantity}`,
          });

          navigate("/products");
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Something went wrong. Please try again. If the error persists, please consult with the Administrator.",
          });
        }
      });
  }

  useEffect(() => {
    console.log(productId);

    fetch(`https://capstone2-dn1l.onrender.com/b4/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
      });
  }, [productId]);

  useEffect(() => {
    if (quantity !== null && quantity !== 0 && quantity <= 10) {
      setIsClickable(true);
    } else {
      setIsClickable(false);
    }
  }, [quantity]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title className="bg-dark text-white py-2">
                {name}
              </Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>₱{price}</Card.Text>
              <Card.Subtitle>Quantity:</Card.Subtitle>
              <div className="increment-decrement justify-content-center my-1">
                <Button onClick={decrement} className="btn btn-dark">
                  -
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleChange}
                  className="form-control"
                  style={{ width: "6rem", textAlign: "center" }}
                />
                <Button onClick={increment} className="btn btn-dark">
                  +
                </Button>
              </div>
            </Card.Body>
            <Card.Footer>
              {user.id !== null && user.id !== undefined ? (
                isClickable ? (
                  <div className="d-grid">
                    <Button
                      size="lg"
                      variant="primary"
                      block="true"
                      onClick={() => addCart(productId)}>
                      Add to Cart
                    </Button>
                  </div>
                ) : (
                  <div className="d-grid">
                    <Button size="lg" variant="danger" block="true" disabled>
                      Add to Cart
                    </Button>
                  </div>
                )
              ) : (
                <Link className="btn btn-danger d-block" to="/login">
                  Log in to add a cart
                </Link>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
