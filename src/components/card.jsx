import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../index.css";

function BasicExample() {
  return (
    <Row>
      <Col lg={4} key={product._id}>
        <img src="" alt={product.name} />
        <h2>{Product.name}</h2>
        <p>{product.description}</p>
        <p>{product._id}</p>
        <UpdateProduct product={product._id} fetchData={fetchData} />
      </Col>
    </Row>
  );
}

export default BasicExample;
