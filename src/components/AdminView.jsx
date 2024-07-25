import { useState } from "react";
import { Button, Container, Row, Col, Modal, Card } from "react-bootstrap";
import AddProduct from "../pages/AddProduct";
import UpdateProduct from "./UpdateProduct";
import DisableProduct from "./DisableProduct";

export default function AdminView({ productData, fetchData }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <Container className="text-center">
        <Button variant="primary" className="m-3" onClick={handleShow}>
          Add new products
        </Button>
        <Button variant="success" className="m-3">
          Show user orders
        </Button>
      </Container>
      <Container>
        <Row>
          {productData.map((product) => (
            <Col xs={12} md={12} lg={4} key={product._id} className="mb-4">
              <Card
                style={{
                  width: "100%",
                  opacity: product.isActive ? 1 : 0.5,
                  position: "relative",
                }}
                className="text-center">
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <p>{product._id}</p>
                  {!product.isActive && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        padding: "10px",
                        borderRadius: "5px",
                      }}>
                      <h1 className="text-danger">Unavailable</h1>
                    </div>
                  )}
                  <UpdateProduct product={product._id} fetchData={fetchData} />
                  <DisableProduct
                    product={product._id}
                    isActive={product.isActive}
                    fetchData={fetchData}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct handleClose={handleClose} fetchData={fetchData} />
        </Modal.Body>
      </Modal>
    </>
  );
}
