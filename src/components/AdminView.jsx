import { useState } from "react";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import AddProduct from "../pages/AddProduct";
import UpdateProduct from "./UpdateProduct";
import DisableProduct from "./DisableProduct";
import ShowUserOrders from "./ShowUsersOrders";
import "../index.css";

export default function AdminView({ productData, fetchData }) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUserOrders, setShowUserOrders] = useState(false);

  const handleShowAddProduct = () => setShowAddProduct(true);
  const handleCloseAddProduct = () => setShowAddProduct(false);

  const handleShowUserOrders = () => setShowUserOrders(true);
  const handleBackToProducts = () => {
    setShowUserOrders(false);
    setShowAddProduct(false);
  };

  return (
    <>
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <Container className="text-center">
        {!showUserOrders ? (
          <>
            {!showAddProduct ? (
              <>
                <Button
                  variant="primary"
                  className="m-3"
                  onClick={handleShowAddProduct}>
                  Add new products
                </Button>
                <Button
                  variant="success"
                  className="m-3"
                  onClick={handleShowUserOrders}>
                  Show user orders
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                className="m-3"
                onClick={handleBackToProducts}>
                Back to Products
              </Button>
            )}
          </>
        ) : (
          <Button
            variant="secondary"
            className="m-3"
            onClick={handleBackToProducts}>
            Back to Products
          </Button>
        )}
      </Container>
      {showUserOrders ? (
        <ShowUserOrders />
      ) : (
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
                          backgroundColor: "rgba(255, 255, 255)",
                          padding: "10px",
                          borderRadius: "5px",
                        }}>
                        <h1 className="text-danger">Unavailable</h1>
                      </div>
                    )}
                    <UpdateProduct
                      product={product._id}
                      fetchData={fetchData}
                    />
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
      )}
      {showAddProduct && (
        <Modal
          show={showAddProduct}
          onHide={handleCloseAddProduct}
          size="lg"
          centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-center w-100">Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddProduct
              handleClose={handleCloseAddProduct}
              fetchData={fetchData}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
