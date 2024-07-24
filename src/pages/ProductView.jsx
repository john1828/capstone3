import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../../UserContext";

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(productId);

    fetch(
      `http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/products/${productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
      });
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {price}</Card.Text>

              {user.id !== null && user.id !== undefined ? (
                <Button variant="primary" block="true">
                  Add to Cart
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Login to add to cart
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
